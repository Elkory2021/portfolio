import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for database
export interface Product {
  id: string
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  price: number
  currency: string
  image: string
  fileUrl?: string
  type: 'digital' | 'service' | 'course'
  category: string
  featured: boolean
  createdAt: string
}

export interface Media {
  id: string
  title: string
  type: 'image' | 'video' | 'audio' | 'document'
  url: string
  size?: number
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  titleAr?: string
  content: string
  contentAr?: string
  excerpt: string
  excerptAr?: string
  category: string
  image?: string
  published: boolean
  createdAt: string
}

export interface Project {
  id: string
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  techStack: string[]
  github?: string
  liveDemo?: string
  image?: string
  gradient: string
  featured: boolean
  createdAt: string
}

export interface SiteContent {
  id: string
  section: string
  content: string
  contentAr?: string
  updatedAt: string
}

// Helper functions
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('createdAt', { ascending: false })
  
  if (error) throw error
  return data as Product[]
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Product
}

export async function getMedia() {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .order('createdAt', { ascending: false })
  
  if (error) throw error
  return data as Media[]
}

export async function uploadMedia(file: File, title: string, type: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${title}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('media')
    .upload(fileName, file)
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(fileName)
  
  // Save to database
  const { data: media, error: dbError } = await supabase
    .from('media')
    .insert([{
      title,
      type,
      url: publicUrl,
      size: file.size
    }])
    .select()
    .single()
  
  if (dbError) throw dbError
  return media as Media
}