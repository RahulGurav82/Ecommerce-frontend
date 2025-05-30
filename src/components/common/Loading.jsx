import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Shopping Bag Icon */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
            animate={{ 
              rotateY: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
          </motion.div>
          
          {/* Floating Dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%'
              }}
              animate={{
                x: [0, 30 * Math.cos(i * 2 * Math.PI / 3), 0],
                y: [0, 30 * Math.sin(i * 2 * Math.PI / 3), 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-700">
            Loading your store
          </h2>
          
          {/* Animated Loading Text */}
          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-500">Please wait</span>
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="text-gray-500 text-xl"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                .
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 256 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Shopping Items Animation */}
        <motion.div
          className="flex space-x-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[
            { icon: '👕', delay: 0 },
            { icon: '👟', delay: 0.2 },
            { icon: '⌚', delay: 0.4 },
            { icon: '🎒', delay: 0.6 }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center text-xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: item.delay + 1,
                ease: "easeInOut"
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;