'use client'

import { useState, useRef } from 'react'
import { Upload, Image, Video, Music, File, X, Loader2 } from 'lucide-react'
import { useConfig, MediaItem } from '@/lib/config-provider'

interface FileUploaderProps {
  onUploadComplete?: (url: string, type: string) => void
}

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const { config, updateConfig } = useConfig()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const getFileType = (file: File): 'image' | 'video' | 'audio' | 'document' => {
    const type = file.type
    if (type.startsWith('image/')) return 'image'
    if (type.startsWith('video/')) return 'video'
    if (type.startsWith('audio/')) return 'audio'
    return 'document'
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return Image
      case 'video': return Video
      case 'audio': return Music
      default: return File
    }
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90))
    }, 100)

    try {
      // Convert file to base64 for local storage demo
      // In production, upload to storage service
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const base64 = await fileToBase64(file)
        const type = getFileType(file)
        
        const newMedia: MediaItem = {
          type,
          url: base64,
          title: file.name
        }

        const updatedMedia = [...(config.media || []), newMedia]
        updateConfig({ media: updatedMedia })
        
        if (onUploadComplete) {
          onUploadComplete(base64, type)
        }
      }

      clearInterval(progressInterval)
      setUploadProgress(100)
      
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 500)

    } catch (error) {
      console.error('Upload error:', error)
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const openUrlDialog = () => {
    const url = prompt('Enter file URL:')
    if (url) {
      const title = prompt('Enter title:') || 'Media File'
      const type = confirm('Is this a video? (OK = video, Cancel = image)') ? 'video' :
                 confirm('Is this audio? (OK = audio, Cancel = image)') ? 'audio' : 'image'
      
      const newMedia: MediaItem = { type: type as any, url, title }
      updateConfig({ media: [...(config.media || []), newMedia] })
    }
  }

  const deleteMedia = (index: number) => {
    const newMedia = (config.media || []).filter((_, i) => i !== index)
    updateConfig({ media: newMedia })
  }

  const supportedTypes = [
    { type: 'image', label: 'Images', extensions: 'jpg, jpeg, png, gif, webp, svg' },
    { type: 'video', label: 'Videos', extensions: 'mp4, webm, mov, avi' },
    { type: 'audio', label: 'Audio', extensions: 'mp3, wav, ogg, m4a' },
    { type: 'document', label: 'Documents', extensions: 'pdf, doc, docx, txt' },
    { type: 'application', label: 'Applications', extensions: 'zip, rar, apk, exe' }
  ]

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-accent bg-accent/10' 
            : 'border-gray-300 dark:border-gray-700'
        }`}
      >
        {uploading ? (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-accent" />
            <p className="text-sm text-gray-500">Uploading... {uploadProgress}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Drag & drop files here, or click to select
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Supported: {supportedTypes.map(t => t.extensions).join(', ')}
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Choose Files
              </button>
              <button
                onClick={openUrlDialog}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                From URL
              </button>
            </div>
          </>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar,.apk,.exe"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Media List */}
      {config.media && config.media.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Uploaded Files ({config.media.length})</h4>
          <div className="grid gap-3">
            {config.media.map((item, index) => {
              const Icon = getFileIcon(item.type)
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${
                        item.type === 'video' ? 'text-red-500' :
                        item.type === 'audio' ? 'text-purple-500' :
                        item.type === 'application' ? 'text-orange-500' :
                        'text-blue-500'
                      }`} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                  </div>
                  <button
                    onClick={() => deleteMedia(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}