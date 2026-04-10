'use client'

import { useState, useEffect } from 'react'
import { X, Save, RotateCcw, User, Folder, FileText, Image as ImageIcon, Plus, Trash2, GripVertical, Lock, LogOut, Upload, Play } from 'lucide-react'
import { useConfig, Project, BlogPost, MediaItem } from '@/lib/config-provider'

type Tab = 'general' | 'about' | 'projects' | 'blog' | 'media' | 'now' | 'background'

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

const categories = ['TypeScript', 'React', 'Next.js', 'Python', 'Learning', 'Tutorial', 'Opinion', 'General']

export default function AdminPanel() {
  const { config, updateConfig, updateProjects, updateBlogPosts, updateMedia, resetConfig, isAuthenticated, authenticate, logout } = useConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('general')
  const [tempConfig, setTempConfig] = useState(config)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null)
  const [showPasswordChange, setShowPasswordChange] = useState(false)

  useEffect(() => {
    setTempConfig(config)
  }, [config])

  const handleLogin = () => {
    if (authenticate(password)) {
      setShowLogin(false)
      setLoginError('')
    } else {
      setLoginError('كلمة المرور غير صحيحة')
    }
  }

  const handleSave = () => {
    // If password was changed, authenticate with the new password
    if (password && password !== (config.adminPassword || '')) {
      authenticate(password)
    }
    updateConfig(tempConfig)
    updateProjects(tempConfig.projects)
    updateBlogPosts(tempConfig.blogPosts)
    updateMedia(tempConfig.media)
    setIsOpen(false)
  }

  const tabs = [
    { id: 'general', label: 'عام', icon: User },
    { id: 'about', label: 'عندي', icon: User },
    { id: 'projects', label: 'أعمالي', icon: Folder },
    { id: 'blog', label: 'المدونة', icon: FileText },
    { id: 'media', label: 'الوسائط', icon: Play },
    { id: 'now', label: 'الآن', icon: FileText },
    { id: 'background', label: 'خلفية', icon: ImageIcon },
  ]

  const handleButtonClick = () => {
    if (isAuthenticated) {
      setIsOpen(true)
    } else {
      setShowLogin(true)
    }
  }

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="لوحة التحكم"
      >
        {isAuthenticated ? <User className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
      </button>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">تسجيل الدخول</h2>
              <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">كلمة المرور</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
              </div>
              <p className="text-sm text-gray-500">
                إذا لم تُضبط كلمة مرور بعد، أدخل كلمة مرور جديدة للإنشاء
              </p>
              <button
                onClick={handleLogin}
                className="w-full py-2 bg-accent text-white rounded-lg hover:bg-accent-hover"
              >
                دخول
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold">لوحة التحكم</h2>
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
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">الاسم</label>
                      <input
                        type="text"
                        value={tempConfig.name}
                        onChange={e => setTempConfig({ ...tempConfig, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">المسمى الوظيفي</label>
                      <input
                        type="text"
                        value={tempConfig.title}
                        onChange={e => setTempConfig({ ...tempConfig, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الوصف</label>
                    <textarea
                      value={tempConfig.tagline}
                      onChange={e => setTempConfig({ ...tempConfig, tagline: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={tempConfig.email}
                      onChange={e => setTempConfig({ ...tempConfig, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
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
                    <div>
                      <label className="block text-sm font-medium mb-1">Twitter</label>
                      <input
                        type="text"
                        value={tempConfig.twitter}
                        onChange={e => setTempConfig({ ...tempConfig, twitter: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="font-medium mb-2">الأمان - تغيير كلمة المرور</h4>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور الجديدة للحفظ"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500 mt-1">أدخل كلمة مرور جديدةواضغط حفظ لتحديثها</p>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">قصتي (فقرات)</label>
                    {tempConfig.about.story.map((paragraph, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <textarea
                          value={paragraph}
                          onChange={e => {
                            const newStory = [...tempConfig.about.story]
                            newStory[i] = e.target.value
                            setTempConfig({ ...tempConfig, about: { ...tempConfig.about, story: newStory } })
                          }}
                          rows={3}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                        <button
                          onClick={() => {
                            const newStory = tempConfig.about.story.filter((_, idx) => idx !== i)
                            setTempConfig({ ...tempConfig, about: { ...tempConfig.about, story: newStory } })
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setTempConfig({ ...tempConfig, about: { ...tempConfig.about, story: [...tempConfig.about.story, ''] } })}
                      className="flex items-center gap-2 text-accent"
                    >
                      <Plus className="w-4 h-4" /> إضافة فقرة
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">المهارات</label>
                    <div className="flex flex-wrap gap-2">
                      {tempConfig.about.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <input
                            type="text"
                            value={skill}
                            onChange={e => {
                              const newSkills = [...tempConfig.about.skills]
                              newSkills[i] = e.target.value
                              setTempConfig({ ...tempConfig, about: { ...tempConfig.about, skills: newSkills } })
                            }}
                            className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <button
                            onClick={() => {
                              const newSkills = tempConfig.about.skills.filter((_, idx) => idx !== i)
                              setTempConfig({ ...tempConfig, about: { ...tempConfig.about, skills: newSkills } })
                            }}
                            className="p-1 text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setTempConfig({ ...tempConfig, about: { ...tempConfig.about, skills: [...tempConfig.about.skills, ''] } })}
                        className="p-2 text-accent"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الخبرات</label>
                    {tempConfig.about.experience.map((exp, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={exp.year}
                          onChange={e => {
                            const newExp = [...tempConfig.about.experience]
                            newExp[i] = { ...newExp[i], year: e.target.value }
                            setTempConfig({ ...tempConfig, about: { ...tempConfig.about, experience: newExp } })
                          }}
                          placeholder="السنة"
                          className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                        <input
                          type="text"
                          value={exp.title}
                          onChange={e => {
                            const newExp = [...tempConfig.about.experience]
                            newExp[i] = { ...newExp[i], title: e.target.value }
                            setTempConfig({ ...tempConfig, about: { ...tempConfig.about, experience: newExp } })
                          }}
                          placeholder="المسمى"
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={e => {
                            const newExp = [...tempConfig.about.experience]
                            newExp[i] = { ...newExp[i], company: e.target.value }
                            setTempConfig({ ...tempConfig, about: { ...tempConfig.about, experience: newExp } })
                          }}
                          placeholder="الشركة"
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                        <button
                          onClick={() => {
                            const newExp = tempConfig.about.experience.filter((_, idx) => idx !== i)
                            setTempConfig({ ...tempConfig, about: { ...tempConfig.about, experience: newExp } })
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setTempConfig({ ...tempConfig, about: { ...tempConfig.about, experience: [...tempConfig.about.experience, { year: '', title: '', company: '' }] } })}
                      className="flex items-center gap-2 text-accent"
                    >
                      <Plus className="w-4 h-4" /> إضافة خبرة
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">أعمالي ({tempConfig.projects.length})</h3>
                    <button
                      onClick={() => {
                        const newProject: Project = {
                          id: Date.now().toString(),
                          title: 'مشروع جديد',
                          description: 'وصف المشروع',
                          techStack: [],
                          gradient: 'from-blue-500 to-cyan-500'
                        }
                        setTempConfig({ ...tempConfig, projects: [...tempConfig.projects, newProject] })
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg"
                    >
                      <Plus className="w-4 h-4" /> إضافة مشروع
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
                      
                      {expandedProject === project.id && (
                        <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                          <input
                            type="text"
                            value={project.title}
                            onChange={e => {
                              const newProjects = [...tempConfig.projects]
                              newProjects[i] = { ...newProjects[i], title: e.target.value }
                              setTempConfig({ ...tempConfig, projects: newProjects })
                            }}
                            placeholder="عنوان المشروع"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <textarea
                            value={project.description}
                            onChange={e => {
                              const newProjects = [...tempConfig.projects]
                              newProjects[i] = { ...newProjects[i], description: e.target.value }
                              setTempConfig({ ...tempConfig, projects: newProjects })
                            }}
                            placeholder="وصف المشروع"
                            rows={2}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <input
                            type="text"
                            value={project.techStack.join(', ')}
                            onChange={e => {
                              const newProjects = [...tempConfig.projects]
                              newProjects[i] = { ...newProjects[i], techStack: e.target.value.split(',').map(s => s.trim()) }
                              setTempConfig({ ...tempConfig, projects: newProjects })
                            }}
                            placeholder="التقنيات (مفصولة بفواصل)"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={project.github || ''}
                              onChange={e => {
                                const newProjects = [...tempConfig.projects]
                                newProjects[i] = { ...newProjects[i], github: e.target.value }
                                setTempConfig({ ...tempConfig, projects: newProjects })
                              }}
                              placeholder="رابط GitHub"
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                            <input
                              type="text"
                              value={project.liveDemo || ''}
                              onChange={e => {
                                const newProjects = [...tempConfig.projects]
                                newProjects[i] = { ...newProjects[i], liveDemo: e.target.value }
                                setTempConfig({ ...tempConfig, projects: newProjects })
                              }}
                              placeholder="رابط المشروع"
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                            <div className="flex flex-wrap gap-2">
                              {gradients.map(g => (
                                <button
                                  key={g}
                                  onClick={() => {
                                    const newProjects = [...tempConfig.projects]
                                    newProjects[i] = { ...newProjects[i], gradient: g }
                                    setTempConfig({ ...tempConfig, projects: newProjects })
                                  }}
                                  className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${g} text-white ${
                                    project.gradient === g ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                                  }`}
                                >
                                  {g}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'blog' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">المدونة ({tempConfig.blogPosts.length})</h3>
                    <button
                      onClick={() => {
                        const newPost: BlogPost = {
                          slug: `post-${Date.now()}`,
                          title: 'مقال جديد',
                          date: new Date().toISOString().split('T')[0],
                          excerpt: 'ملخص المقالة',
                          category: 'General',
                          content: '## المقدمة\n\nمحتوى المقالة...'
                        }
                        setTempConfig({ ...tempConfig, blogPosts: [...tempConfig.blogPosts, newPost] })
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg"
                    >
                      <Plus className="w-4 h-4" /> إضافة مقال
                    </button>
                  </div>
                  
                  {tempConfig.blogPosts.map((post, i) => (
                    <div key={post.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                        onClick={() => setExpandedBlog(expandedBlog === post.slug ? null : post.slug)}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{post.title}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const newPosts = tempConfig.blogPosts.filter((_, idx) => idx !== i)
                            setTempConfig({ ...tempConfig, blogPosts: newPosts })
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {expandedBlog === post.slug && (
                        <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                          <input
                            type="text"
                            value={post.title}
                            onChange={e => {
                              const newPosts = [...tempConfig.blogPosts]
                              newPosts[i] = { ...newPosts[i], title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') }
                              setTempConfig({ ...tempConfig, blogPosts: newPosts })
                            }}
                            placeholder="عنوان المقالة"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="date"
                              value={post.date}
                              onChange={e => {
                                const newPosts = [...tempConfig.blogPosts]
                                newPosts[i] = { ...newPosts[i], date: e.target.value }
                                setTempConfig({ ...tempConfig, blogPosts: newPosts })
                              }}
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                            <select
                              value={post.category}
                              onChange={e => {
                                const newPosts = [...tempConfig.blogPosts]
                                newPosts[i] = { ...newPosts[i], category: e.target.value }
                                setTempConfig({ ...tempConfig, blogPosts: newPosts })
                              }}
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                            >
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                          <textarea
                            value={post.excerpt}
                            onChange={e => {
                              const newPosts = [...tempConfig.blogPosts]
                              newPosts[i] = { ...newPosts[i], excerpt: e.target.value }
                              setTempConfig({ ...tempConfig, blogPosts: newPosts })
                            }}
                            placeholder="ملخص المقالة"
                            rows={2}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <textarea
                            value={post.content}
                            onChange={e => {
                              const newPosts = [...tempConfig.blogPosts]
                              newPosts[i] = { ...newPosts[i], content: e.target.value }
                              setTempConfig({ ...tempConfig, blogPosts: newPosts })
                            }}
                            placeholder="محتوى المقالة (Markdown)"
                            rows={6}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">الوسائط ({tempConfig.media?.length || 0})</h3>
                    <button
                      onClick={() => {
                        const url = prompt('أدخل رابط الملف (صورة/فيديو/صوت):')
                        if (url) {
                          const title = prompt('أدخل عنوان الملف:') || 'ملف جديد'
                          const type = confirm('هل هذا فيديو؟ (موافق = فيديو، إلغاء = صوت/image)') ? 'video' : 
                                     confirm('هل هذا صورة؟ (موافق = صورة،取消 = صوت)') ? 'image' : 'audio'
                          const newMedia: MediaItem = { type: type as 'image' | 'video' | 'audio', url, title }
                          setTempConfig({ ...tempConfig, media: [...(tempConfig.media || []), newMedia] })
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg"
                    >
                      <Plus className="w-4 h-4" /> إضافة ملف
                    </button>
                  </div>
                  {tempConfig.media?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.type === 'video' && <Play className="w-4 h-4 text-red-500" />}
                        {item.type === 'audio' && <Play className="w-4 h-4 text-blue-500" />}
                        {item.type === 'image' && <ImageIcon className="w-4 h-4 text-green-500" />}
                        <span>{item.title}</span>
                      </div>
                      <button
                        onClick={() => {
                          const newMedia = tempConfig.media?.filter((_, idx) => idx !== i)
                          setTempConfig({ ...tempConfig, media: newMedia })
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'now' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">أ actualmente أدرس</label>
                    <textarea
                      value={tempConfig.now.learning}
                      onChange={e => setTempConfig({ ...tempConfig, now: { ...tempConfig.now, learning: e.target.value } })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">التركيز الحالي</label>
                    <textarea
                      value={tempConfig.now.focus}
                      onChange={e => setTempConfig({ ...tempConfig, now: { ...tempConfig.now, focus: e.target.value } })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">استكشاف</label>
                    <textarea
                      value={tempConfig.now.exploring}
                      onChange={e => setTempConfig({ ...tempConfig, now: { ...tempConfig.now, exploring: e.target.value } })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'background' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">صورة الخلفية</label>
                    <input
                      type="text"
                      value={tempConfig.background.image}
                      onChange={e => setTempConfig({ ...tempConfig, background: { ...tempConfig.background, image: e.target.value } })}
                      placeholder="/background.jpg"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ضباب: {tempConfig.background.blur}</label>
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
                    <label className="block text-sm font-medium mb-1">شفافية: {Math.round(tempConfig.background.opacity * 100)}%</label>
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
              )}
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex gap-2">
                <button
                  onClick={resetConfig}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                >
                  <RotateCcw className="w-4 h-4" /> إعادة تعيين
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" /> خروج
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover"
                >
                  <Save className="w-4 h-4" /> حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}