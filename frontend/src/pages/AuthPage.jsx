import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../components/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});

  const authState = useSelector(state => state.auth || {});
  const { loading = false, error = null, userInfo = null } = authState.userLogin || {};
  
  console.log("Current auth state:", authState);
  console.log("User info exists?", !!userInfo);
  console.log("User role:", userInfo?.role);

  useEffect(() => {
    // Only proceed if we have valid userInfo with role
    if (userInfo && userInfo.role) {
      console.log("Registration successful, redirecting...", userInfo);
      
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Add slight delay for toast to be visible
      const timer = setTimeout(() => {
        const redirectPath = 
          userInfo.role === 'admin' ? '/admin-dashboard' :
          userInfo.role === 'alumni' ? '/alumni-dashboard' :
          '/dashboard';
        
        console.log("Navigating to:", redirectPath);
        navigate(redirectPath);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [userInfo, navigate, isLogin]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      const { email, password } = formData;
      dispatch(login(email, password));
    } else {
      const { name, email, password, role } = formData;
      dispatch(register(name, email, password, role));
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return 2;
    return 3;
  };

  const strength = getPasswordStrength(formData.password);

  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student'
    });
    setErrors({});
  }, [isLogin]);

  // Floating background elements animation variants
  const floatingVariants = {
    animate: {
      y: [0, -40, 0],
      x: [0, 20, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      className="py-20 relative overflow-hidden min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-blue-400 opacity-20"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-blue-500 opacity-20"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 0.5 }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Left Side - Welcome Message */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block">Welcome to</span>
              <motion.span
                className="block bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Alumni Network
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isLogin
                ? "Log in to connect with mentors, find job opportunities, and join events."
                : "Join our network to access exclusive resources and grow your career."}
            </motion.p>
            <div className="hidden lg:block">
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className={`px-8 py-3 rounded-full font-medium border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-colors`}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {isLogin ? "Need an account? Register" : "Already have an account? Login"}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            className="w-full lg:w-1/2 max-w-md"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg"
              whileHover={{ scale: 1.01 }}
            >
              {/* Toggle Buttons */}
              <motion.div
                className="flex mb-8 border-b border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 font-bold ${isLogin ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FiLogIn className="w-5 h-5" />
                    <span>Login</span>
                  </div>
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 font-bold ${!isLogin ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FiUserPlus className="w-5 h-5" />
                    <span>Register</span>
                  </div>
                </button>
              </motion.div>

              {/* Error Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-300 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                          <FiUser className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:outline-none text-white`}
                          placeholder="Full Name"
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          className="mt-1 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:outline-none text-white`}
                      placeholder="Email Address"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                      <FiLock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-3 rounded-lg bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:outline-none text-white`}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                  {!isLogin && (
                    <motion.div
                      className="w-full bg-gray-700 rounded-full h-1.5 mt-2"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.4 }}
                    >
                      <div
                        className={`h-1.5 rounded-full ${strength === 0 ? 'bg-gray-600' :
                          strength === 1 ? 'bg-red-500' :
                            strength === 2 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        style={{ width: `${(strength / 3) * 100}%` }}
                      ></div>
                    </motion.div>
                  )}
                </motion.div>

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <>
                      <motion.div
                        key="confirm-password"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                            <FiLock className="w-5 h-5" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-10 py-3 rounded-lg bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:outline-none text-white`}
                            placeholder="Confirm Password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500"
                          >
                            {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <motion.p
                            className="mt-1 text-sm text-red-500"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                        >
                          <option value="student">Student</option>
                          <option value="alumni">Alumni</option>
                        </select>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </span>
                  ) : isLogin ? (
                    <>
                      <span>Login</span>
                      <FiLogIn className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span>Register</span>
                      <FiUserPlus className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Mobile Toggle */}
              <motion.div
                className="mt-6 text-center lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:underline"
                >
                  {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AuthPage;