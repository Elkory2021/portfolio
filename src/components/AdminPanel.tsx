'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  X, Save, RotateCcw, User, Folder, FileText, Image as ImageIcon, 
  Plus, Trash2, GripVertical, Lock, LogOut, Play, Upload, DollarSign,
  Package, ShoppingCart, File, CheckCircle, Eye, Edit, CreditCard,
  BarChart3, Settings, Globe, Palette
} from 'lucide-react'
import { useConfig, Project, BlogPost, MediaItem } from '@/lib/config-provider'
import { useAuthStore } from '@/lib/auth-store'
import { useLanguage } from '@/lib/language-provider'
import FileUploader from './FileUploader'
import Image from 'next/image'

type Tab = 'general' | 'about' | 'projects' | 'blog' | 'media' | 'products' | 'store' | 'settings'

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-amber-500',
  'from-indigo-500 to-violet-500',
  'from-sky-500 to-blue-500',
  'from-rose-500 to-red-500',
  'from-teal-500 to-cyan-500'
]

const productTypes = [
  { value: 'digital', label: 'Digital Product', labelAr: 'منتج رقمي' },
  { value: 'service', label: 'Service', labelAr: 'خدمة' },
  { value: 'course', label: 'Course', labelAr: 'دورة تعليمية' }
]

const categories = ['TypeScript', 'React', 'Next.js', 'Python', 'Learning', 'Tutorial', 'Opinion', 'General']

interface Product {
  id: string
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  price: number
  currency: string
  image: string
  fileUrl?: string
  type: string
  category: string
}

export default function AdminPanel() {
  const { config, updateConfig, updateProjects, updateBlogPosts, updateMedia, resetConfig } = useConfig()
  const { isAuthenticated, login, logout } = useAuthStore()
  const { t } = useLanguage()
  
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  const [activeTab, setActiveTab] = useState<Tab>('general')
  const [tempConfig, setTempConfig] = useState(config)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null)
  
  // Products state
  const [products, setProducts] = useState<Product[]>([])
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({})
  
  // Uploading state
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setTempConfig(config)
    // Load products from localStorage
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [config])

  // Protected component - only render if authenticated
  useEffect(() => {
    if (!isAuthenticated && !showLogin) {
      // Check session
      const session = sessionStorage.getItem('admin-session')
      if (session === 'true') {
        // Auth is handled in store
      }
    }
  }, [isAuthenticated, showLogin])

  const handleLogin = async () => {
    const success = await login(email, password)
    if (success) {
      sessionStorage.setItem('admin-session', 'true')
      setShowLogin(false)
      setLoginError('')
      setIsOpen(true)
    } else {
      setLoginError('Invalid credentials')
    }
  }

  const handleSave = () => {
    updateConfig(tempConfig)
    updateProjects(tempConfig.projects)
    updateBlogPosts(tempConfig.blogPosts)
    updateMedia(tempConfig.media)
    // Save products
    localStorage.setItem('products', JSON.stringify(products))
    setIsOpen(false)
  }

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      title: newProduct.title || 'New Product',
      titleAr: newProduct.titleAr || '',
      description: newProduct.description || '',
      descriptionAr: newProduct.descriptionAr || '',
      price: newProduct.price || 0,
      currency: newProduct.currency || 'USD',
      image: newProduct.image || '',
      type: newProduct.type || 'digital',
      category: newProduct.category || 'General'
    }
    const newProducts = [...products, product]
    setProducts(newProducts)
    localStorage.setItem('products', JSON.stringify(newProducts))
    setNewProduct({})
  }

  const handleDeleteProduct = (id: string) => {
    const newProducts = products.filter(p => p.id !== id)
    setProducts(newProducts)
    localStorage.setItem('products', JSON.stringify(newProducts))
  }

  const tabs = [
    { id: 'general', label: 'General', labelAr: 'عام', icon: Globe },
    { id: 'about', label: 'About', labelAr: 'عندي', icon: User },
    { id: 'projects', label: 'Projects', labelAr: 'أعمالي', icon: Folder },
    { id: 'blog', label: 'Blog', labelAr: 'المدونة', icon: FileText },
    { id: 'media', label: 'Media', labelAr: 'الوسائط', icon: Play },
    { id: 'products', label: 'Products', labelAr: 'منتجات', icon: Package },
    { id: 'store', label: 'Store', labelAr: 'المتجرة', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', labelAr: 'الإعدادات', icon: Settings },
  ]

  const handleButtonClick = () => {
    if (isAuthenticated) {
      setIsOpen(true)
    } else {
      setShowLogin(true)
    }
  }

  // Get current language labels
  const currentLabels = {
    general: 'عام',
    about: 'عندي',
    projects: 'أعمالي',
    blog: 'المدونة',
    media: 'الوسائط',
    products: 'منتجات',
    store: 'المتجرة',
    settings: 'الإعدادات'
  }

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Admin Panel"
      >
        {isAuthenticated ? <User className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
      </button>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Admin Login</h2>
              <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@portfolio.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-2 bg-accent text-white rounded-lg hover:bg-accent-hover"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isOpen && isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">Active</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm ${
                    activeTab === tab.id
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {currentLabels[tab.id as keyof typeof currentLabels]}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={tempConfig.name}
                        onChange={e => setTempConfig({ ...tempConfig, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={tempConfig.title}
                        onChange={e => setTempConfig({ ...tempConfig, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tagline (English)</label>
                    <textarea
                      value={tempConfig.tagline}
                      onChange={e => setTempConfig({ ...tempConfig, tagline: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">التاغلاين (العربية)</label>
                    <textarea
                      value={tempConfig.taglineAr || ''}
                      onChange={e => setTempConfig({ ...tempConfig, taglineAr: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      dir="rtl"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={tempConfig.email}
                        onChange={e => setTempConfig({ ...tempConfig, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">GitHub</label>
                      <input
                        type="text"
                        value={tempConfig.github}
                        onChange={e => setTempConfig({ ...tempConfig, github: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={tempConfig.linkedin}
                        onChange={e => setTempConfig({ ...tempConfig, linkedin: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Products ({products.length})</h3>
                  </div>
                  
                  {/* Add New Product Form */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium">Add New Product</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newProduct.title || ''}
                        onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                        placeholder="Product Title (EN)"
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                      <input
                        type="text"
                        value={newProduct.titleAr || ''}
                        onChange={e => setNewProduct({ ...newProduct, titleAr: e.target.value })}
                        placeholder="Product Title (AR)"
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        dir="rtl"
                      />
                    </div>
                    <textarea
                      value={newProduct.description || ''}
                      onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Description (EN)"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        type="number"
                        value={newProduct.price || ''}
                        onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        placeholder="Price"
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                      <select
                        value={newProduct.currency || 'USD'}
                        onChange={e => setNewProduct({ ...newProduct, currency: e.target.value })}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="SAR">SAR (ر.س)</option>
                        <option value="EGP">EGP (ج.م)</option>
                      </select>
                      <select
                        value={newProduct.type || 'digital'}
                        onChange={e => setNewProduct({ ...newProduct, type: e.target.value })}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        {productTypes.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newProduct.image || ''}
                        onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="Image URL"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                      <input
                        type="text"
                        value={newProduct.fileUrl || ''}
                        onChange={e => setNewProduct({ ...newProduct, fileUrl: e.target.value })}
                        placeholder="Download URL"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <button
                      onClick={handleAddProduct}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>
                  
                  {/* Products List */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{product.title}</h4>
                            <p className="text-sm text-gray-500">{product.description?.substring(0, 50)}...</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-lg font-bold text-green-600">
                                {product.price} {product.currency}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded">
                                {product.type}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {products.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No products yet. Add your first product above.
                    </div>
                  )}
                </div>
              )}

              {/* Media Tab - Using FileUploader */}
              {activeTab === 'media' && (
                <FileUploader />
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Projects ({tempConfig.projects.length})</h3>
                    <button
                      onClick={() => {
                        const newProject: Project = {
                          id: Date.now().toString(),
                          title: 'New Project',
                          description: 'Project description',
                          techStack: [],
                          gradient: 'from-blue-500 to-cyan-500'
                        }
                        setTempConfig({ ...tempConfig, projects: [...tempConfig.projects, newProject] })
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg"
                    >
                      <Plus className="w-4 h-4" /> Add Project
                    </button>
                  </div>
                  
                  {tempConfig.projects.map((project, i) => (
                    <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{project.title}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const newProjects = tempConfig.projects.filter((_, idx) => idx !== i)
                            setTempConfig({ ...tempConfig, projects: newProjects })
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Blog Tab */}
              {activeTab === 'blog' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Blog Posts ({tempConfig.blogPosts.length})</h3>
                    <button
                      onClick={() => {
                        const newPost: BlogPost = {
                          slug: `post-${Date.now()}`,
                          title: 'New Post',
                          date: new Date().toISOString().split('T')[0],
                          excerpt: 'Excerpt...',
                          category: 'General',
                          content: 'Content...'
                        }
                        setTempConfig({ ...tempConfig, blogPosts: [...tempConfig.blogPosts, newPost] })
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg"
                    >
                      <Plus className="w-4 h-4" /> Add Post
                    </button>
                  </div>
                  
                  {tempConfig.blogPosts.map((post, i) => (
                    <div key={post.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{post.title}</h4>
                          <p className="text-sm text-gray-500">{post.date} - {post.category}</p>
                        </div>
                        <button
                          onClick={() => {
                            const newPosts = tempConfig.blogPosts.filter((_, idx) => idx !== i)
                            setTempConfig({ ...tempConfig, blogPosts: newPosts })
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Password Protection</h4>
                    <input
                      type="password"
                      placeholder="New password (min 6 characters)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to keep current password</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Background Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Background Image URL</label>
                        <input
                          type="text"
                          value={tempConfig.background.image}
                          onChange={e => setTempConfig({ ...tempConfig, background: { ...tempConfig.background, image: e.target.value } })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Blur: {tempConfig.background.blur}</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={tempConfig.background.blur}
                          onChange={e => setTempConfig({ ...tempConfig, background: { ...tempConfig.background, blur: Number(e.target.value) } })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Opacity: {Math.round(tempConfig.background.opacity * 100)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tempConfig.background.opacity * 100}
                          onChange={e => setTempConfig({ ...tempConfig, background: { ...tempConfig.background, opacity: Number(e.target.value) / 100 } })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={resetConfig}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="w-4 h-4" /> Reset All
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                    sessionStorage.removeItem('admin-session')
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}