'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { Cloud, DollarSign, TrendingUp, Menu, X, User, Bell, Search, Moon, Sun, Download, Calendar, Settings, HelpCircle, LogOut, Briefcase, Mail, Phone, MapPin, Clock, Shield, Activity } from 'lucide-react'
import { format, subDays, subMonths, parseISO, differenceInDays } from 'date-fns'

// Mock data generation functions
const generateRandomData = (count, max, min= 0) => {
  return Array.from({ length: count }, (_, i) => ({
    name: format(subDays(new Date(), count - i - 1), 'MMM dd'),
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }))
}

const generateRandomPieData = () => {
  return [
    { name: 'Compute', value: Math.floor(Math.random() * 100) },
    { name: 'Storage', value: Math.floor(Math.random() * 100) },
    { name: 'Network', value: Math.floor(Math.random() * 100) },
    { name: 'Other', value: Math.floor(Math.random() * 100) },
  ]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const generateProfileData = () => ({
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Cloud Administrator',
  department: 'IT Operations',
  company: 'TechCorp Solutions',
  location: 'New York, NY',
  phoneNumber: '+1 (555) 123-4567',
  totalLogins: 152,
  lastLogin: new Date().toISOString(),
  accountCreated: subMonths(new Date(), 6).toISOString(),
  recentActivity: [
    { action: 'Updated resource allocation', date: subDays(new Date(), 2).toISOString() },
    { action: 'Generated monthly report', date: subDays(new Date(), 7).toISOString() },
    { action: 'Added new team member', date: subDays(new Date(), 14).toISOString() },
    { action: 'Optimized cloud storage', date: subDays(new Date(), 21).toISOString() },
    { action: 'Conducted security audit', date: subDays(new Date(), 30).toISOString() },
  ],
  skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Python', 'Node.js'],
  certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional Cloud Architect', 'Certified Kubernetes Administrator'],
  projectsCompleted: 23,
  teamSize: 8,
})

export default function EnhancedCloudDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [usageData, setUsageData] = useState(generateRandomData(30, 100))
  const [costData, setCostData] = useState(generateRandomData(12, 1000, 500))
  const [pieData, setPieData] = useState(generateRandomPieData())
  const [dateRange, setDateRange] = useState('30d')
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [profileData, setProfileData] = useState(generateProfileData())

  const fetchData = useCallback(() => {
    const newUsageData = generateRandomData(dateRange === '30d' ? 30 : 12, 100)
    const newCostData = generateRandomData(dateRange === '30d' ? 30 : 12, 1000, 500)
    const newPieData = generateRandomPieData()
    
    setUsageData(prevData => {
      return prevData.map((item, index) => ({
        ...item,
        value: newUsageData[index].value
      }))
    })
    
    setCostData(prevData => {
      return prevData.map((item, index) => ({
        ...item,
        value: newCostData[index].value
      }))
    })
    
    setPieData(newPieData)
  }, [dateRange])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every 60 seconds
    return () => clearInterval(interval)
  }, [fetchData])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + usageData.map(row => `${row.name},${row.value}`).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "cloud_usage_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const addNotification = (message) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => setNotifications(prev => prev.slice(1)), 5000)
  }

  const filteredUsageData = useMemo(() => 
    usageData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [usageData, searchQuery]
  )

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top-level metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Usage</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {usageData.reduce((sum, item) => sum + item.value, 0)} GB
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Cost</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      ${costData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Usage Trend</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {((usageData[usageData.length - 1].value - usageData[0].value) / usageData[0].value * 100).toFixed(2)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
              <TrendingUp className="mr-2 text-blue-500" />
              Cloud Usage Trends
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredUsageData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB', border: '1px solid #374151' }}
                  labelStyle={{ color: isDarkMode ? '#F3F4F6' : '#111827' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
              <DollarSign className="mr-2 text-green-500" />
              Predicted Future Costs
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB', border: '1px solid #374151' }}
                  labelStyle={{ color: isDarkMode ? '#F3F4F6' : '#111827' }}
                />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-8"
      >
        <div className="p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <Cloud className="mr-2 text-blue-500" />
            Resource Allocation
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB', border: '1px solid #374151' }}
                labelStyle={{ color: isDarkMode ? '#F3F4F6' : '#111827' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center">
            {pieData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center mr-4">
                <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Export Data Button */}
      <div className="flex justify-end mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportData}
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="mr-2 h-5 w-5" />
          Export Data
        </motion.button>
      </div>
    </motion.div>
  )

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="text-center mb-6">
            <img
              className="mx-auto h-32 w-32 rounded-full"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${profileData.name}`}
              alt={profileData.name}
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">{profileData.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profileData.role}</p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <dl className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-100">{profileData.email}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-100">{profileData.phoneNumber}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-100">{profileData.department}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-100">{profileData.location}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Account Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Logins</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">{profileData.totalLogins}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects Completed</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">{profileData.projectsCompleted}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Size</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">{profileData.teamSize}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Age</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                {differenceInDays(new Date(), parseISO(profileData.accountCreated))} days
              </p>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Skills & Certifications</h3>
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {skill}
                </span>
              ))}
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              {profileData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Activity</h3>
          <ul className="space-y-4">
            {profileData.recentActivity.map((activity, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {format(parseISO(activity.date), 'PPP')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Cloud className="h-8 w-8 text-blue-500" />
                  <span className="ml-2 text-xl font-semibold">CloudInsights</span>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 ${activeTab === 'dashboard' ? 'font-bold' : ''}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 ${activeTab === 'profile' ? 'font-bold' : ''}`}
                >
                  Profile
                </button>
                <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Settings</button>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button 
                  onClick={toggleDarkMode}
                  className="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </button>
                <button className="ml-3 p-1 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <Bell className="h-6 w-6" />
                </button>
                <button className="ml-3 p-1 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <User className="h-6 w-6" />
                </button>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">Dashboard</a>
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">Profile</a>
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">Settings</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <motion.div
            initial={{ width: isSidebarOpen ? 250 : 0 }}
            animate={{ width: isSidebarOpen ? 250 : 0 }}
            className="bg-gray-800 text-white overflow-hidden transition-all duration-300"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Menu</h2>
              <ul>
                <li className="mb-2">
                  <a href="#" className="flex items-center text-gray-300 hover:text-white">
                    <TrendingUp className="mr-2" /> Analytics
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="flex items-center text-gray-300 hover:text-white">
                    <DollarSign className="mr-2" /> Billing
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="flex items-center text-gray-300 hover:text-white">
                    <Settings className="mr-2" /> Settings
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="flex items-center text-gray-300 hover:text-white">
                    <HelpCircle className="mr-2" /> Help
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Main content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    {activeTab === 'dashboard' ? 'Cloud Usage Analytics' : 'User Profile'}
                  </h1>
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </div>

                {activeTab ===
 'dashboard' && (
                  <>
                    {/* Search and Date Range */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                      <div className="w-full sm:w-64 mb-4 sm:mb-0">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <label htmlFor="dateRange" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date Range:</label>
                        <select
                          id="dateRange"
                          value={dateRange}
                          onChange={(e) => setDateRange(e.target.value)}
                          className="rounded-md border-gray-300 dark:border-gray-600 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        >
                          <option value="30d">Last 30 Days</option>
                          <option value="12m">Last 12 Months</option>
                        </select>
                      </div>
                    </div>
                    {renderDashboard()}
                  </>
                )}

                {activeTab === 'profile' && renderProfile()}

                {/* Notifications */}
                <AnimatePresence>
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg"
                    >
                      {notification}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">CloudInsights</h3>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">Empowering your cloud decisions</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Privacy Policy</a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Terms of Service</a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Contact</a>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              © 2024 CloudInsights. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}