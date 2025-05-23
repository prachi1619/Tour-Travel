import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export type UserRole = 'user' | 'admin' | 'superadmin';

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    
    // Create user document in Firestore with role
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role: 'user', // Default role for new users
      createdAt: new Date().toISOString(),
      photoURL: user.photoURL || null,
      bio: '',
      favorites: [],
      reviews: [],
      trips: []
    });
  };

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Fetch user role after login
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (userDoc.exists()) {
      setUserRole(userDoc.data().role as UserRole);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserRole('user'); // Reset role on logout
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    
    // Check if user document exists, if not create one
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        role: 'user', // Default role for new Google users
        createdAt: new Date().toISOString(),
        photoURL: user.photoURL,
        bio: '',
        favorites: [],
        reviews: [],
        trips: []
      });
    } else {
      setUserRole(userDoc.data().role as UserRole);
    }
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!currentUser) throw new Error('No user logged in');
    await updateProfile(currentUser, data);
    
    // Update Firestore document
    await setDoc(doc(db, 'users', currentUser.uid), {
      name: data.displayName || currentUser.displayName,
      photoURL: data.photoURL || currentUser.photoURL,
    }, { merge: true });
  };

  // Helper functions to check roles
  const isAdmin = () => userRole === 'admin' || userRole === 'superadmin';
  const isSuperAdmin = () => userRole === 'superadmin';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user role when auth state changes
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role as UserRole);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    signup,
    login,
    logout,
    googleSignIn,
    updateUserProfile,
    isAdmin,
    isSuperAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 