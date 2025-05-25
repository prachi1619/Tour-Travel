// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { FaUser, FaCalendar } from 'react-icons/fa';

// const WelcomeSection: React.FC = () => {
//   const { currentUser } = useAuth();

//   if (!currentUser) return null;

//   return (
//     <div className="bg-white dark:bg-navy-900 rounded-lg shadow-sm p-6 mb-8">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="flex-shrink-0">
//             <img
//               src={currentUser.photoURL || '/default-avatar.png'}
//               alt={currentUser.displayName || 'User'}
//               className="h-12 w-12 rounded-full object-cover"
//             />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//               Welcome back!
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               {currentUser.displayName || 'Traveler'}
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-3">
//           <Link
//             to="/profile"
//             className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-navy-800 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-navy-800 hover:bg-gray-50 dark:hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//           >
//             <FaUser className="mr-2 -ml-1" />
//             View Profile
//           </Link>
//           <Link
//             to="/bookings"
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//           >
//             <FaCalendar className="mr-2 -ml-1" />
//             My Bookings
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;