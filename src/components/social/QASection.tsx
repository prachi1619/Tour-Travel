import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { QA, Answer } from '../../types/social';
import { FaCheck, FaThumbsUp } from 'react-icons/fa';

interface QASectionProps {
  destinationId: string;
}

const QASection: React.FC<QASectionProps> = ({ destinationId }) => {
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState<QA[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [destinationId]);

  const fetchQuestions = async () => {
    try {
      const q = query(
        collection(db, 'destination-qa'),
        where('destinationId', '==', destinationId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedQuestions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as QA[];
      setQuestions(fetchedQuestions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load Q&A');
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newQuestion.trim()) return;

    try {
      setLoading(true);
      setError('');

      const question = {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
        destinationId,
        question: newQuestion.trim(),
        answers: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'destination-qa'), question);
      await fetchQuestions();

      setNewQuestion('');
    } catch (err) {
      console.error('Error submitting question:', err);
      setError('Failed to submit question');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (questionId: string) => {
    if (!currentUser || !newAnswer.trim()) return;

    try {
      setLoading(true);
      setError('');

      const answer: Answer = {
        id: Date.now().toString(), // Client-side generated ID
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
        content: newAnswer.trim(),
        isAccepted: false,
        likes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const question = questions.find(q => q.id === questionId);
      if (question) {
        const questionRef = doc(db, 'destination-qa', questionId);
        await updateDoc(questionRef, {
          answers: [...question.answers, answer],
          updatedAt: new Date().toISOString(),
        });
        await fetchQuestions();
      }

      setNewAnswer('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError('Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAnswer = async (questionId: string, answerId: string) => {
    if (!currentUser) return;

    try {
      const question = questions.find(q => q.id === questionId);
      if (question && question.userId === currentUser.uid) {
        const questionRef = doc(db, 'destination-qa', questionId);
        const updatedAnswers = question.answers.map(answer => ({
          ...answer,
          isAccepted: answer.id === answerId,
        }));

        await updateDoc(questionRef, {
          answers: updatedAnswers,
          updatedAt: new Date().toISOString(),
        });
        await fetchQuestions();
      }
    } catch (err) {
      console.error('Error accepting answer:', err);
    }
  };

  const handleLikeAnswer = async (questionId: string, answerId: string) => {
    if (!currentUser) return;

    try {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        const questionRef = doc(db, 'destination-qa', questionId);
        const updatedAnswers = question.answers.map(answer => {
          if (answer.id === answerId) {
            return { ...answer, likes: answer.likes + 1 };
          }
          return answer;
        });

        await updateDoc(questionRef, {
          answers: updatedAnswers,
          updatedAt: new Date().toISOString(),
        });
        await fetchQuestions();
      }
    } catch (err) {
      console.error('Error liking answer:', err);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Questions & Answers</h2>

      {/* Ask Question Form */}
      {currentUser && (
        <form onSubmit={handleQuestionSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Ask a Question</label>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-4 border rounded resize-none"
              rows={3}
              placeholder="What would you like to know about this destination?"
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !newQuestion.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Question'}
          </button>
        </form>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map(question => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
            {/* Question */}
            <div className="flex items-start gap-4 mb-6">
              <img
                src={question.userPhoto || 'https://via.placeholder.com/40'}
                alt={question.userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{question.userName}</span>
                  <span className="text-sm text-gray-600">
                    {new Date(question.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-lg">{question.question}</p>
              </div>
            </div>

            {/* Answers */}
            <div className="space-y-4 ml-8">
              {question.answers.map(answer => (
                <div
                  key={answer.id}
                  className={`p-4 rounded ${
                    answer.isAccepted ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={answer.userPhoto || 'https://via.placeholder.com/32'}
                      alt={answer.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{answer.userName}</span>
                        <span className="text-sm text-gray-600">
                          {new Date(answer.createdAt).toLocaleDateString()}
                        </span>
                        {answer.isAccepted && (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <FaCheck />
                            Accepted Answer
                          </span>
                        )}
                      </div>
                      <p>{answer.content}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <button
                          onClick={() => handleLikeAnswer(question.id, answer.id)}
                          disabled={!currentUser}
                          className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        >
                          <FaThumbsUp />
                          <span>{answer.likes}</span>
                        </button>
                        {currentUser?.uid === question.userId && !answer.isAccepted && (
                          <button
                            onClick={() => handleAcceptAnswer(question.id, answer.id)}
                            className="text-green-600 hover:text-green-700 text-sm"
                          >
                            Accept Answer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Answer Form */}
              {currentUser && (replyingTo === question.id || !question.answers.length) && (
                <div className="mt-4">
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="w-full p-2 border rounded resize-none"
                    rows={3}
                    placeholder="Write your answer..."
                    required
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setNewAnswer('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAnswerSubmit(question.id)}
                      disabled={loading || !newAnswer.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Posting...' : 'Post Answer'}
                    </button>
                  </div>
                </div>
              )}

              {currentUser && !replyingTo && question.answers.length > 0 && (
                <button
                  onClick={() => setReplyingTo(question.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Answer this question
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QASection; 