'use client'

import { useState, useEffect } from 'react'
import { X, Save, RotateCcw, Image as ImageIcon, User, Plus, Trash2 } from 'lucide-react'
import { useConfig, ProfileConfig } from '@/lib/config-provider'
import Image from 'next/image'

type Tab = 'general' | 'about' | 'now' | 'background'

export default function AdminPanel() {
  const { config, updateConfig, resetConfig } = useConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('general')
  const [tempConfig, setTempConfig] = useState<ProfileConfig>(config)

  useEffect(() => {
    setTempConfig(config)
  }, [config])

  const handleSave = () => {
    updateConfig(tempConfig)
    setIsOpen(false)
  }

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'about', label: 'About', icon: ImageIcon },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Open Admin Panel"
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
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
                  <div>
                    <label className="block text-sm font-medium mb-1">Tagline</label>
                    <textarea
                      value={tempConfig.tagline}
                      onChange={e => setTempConfig({ ...tempConfig, tagline: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={tempConfig.email}
                      onChange={e => setTempConfig({ ...tempConfig, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
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
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Story Paragraphs</label>
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
                      <Plus className="w-4 h-4" /> Add Paragraph
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Skills</label>
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
                </div>
              )}

              {activeTab === 'now' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Currently Learning</label>
                    <textarea
                      value={tempConfig.now.learning}
                      onChange={e => setTempConfig({ ...tempConfig, now: { ...tempConfig.now, learning: e.target.value } })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Focus</label>
                    <textarea
                      value={tempConfig.now.focus}
                      onChange={e => setTempConfig({ ...tempConfig, now: { ...tempConfig.now, focus: e.target.value } })}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Exploring</label>
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
                    <label className="block text-sm font-medium mb-1">Background Image URL</label>
                    <input
                      type="text"
                      value={tempConfig.background.image}
                      onChange={e => setTempConfig({ ...tempConfig, background: { ...tempConfig.background, image: e.target.value } })}
                      placeholder="/background.jpg"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <p className="text-sm text-gray-500 mt-1">Put image in public folder</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Blur Amount: {tempConfig.background.blur}</label>
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
                    <label className="block text-sm font-medium mb-1">Opacity: {tempConfig.background.opacity}%</label>
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
              <button
                onClick={resetConfig}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}