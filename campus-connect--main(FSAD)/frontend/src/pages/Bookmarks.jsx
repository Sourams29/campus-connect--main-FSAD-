import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Search, Filter, Calendar, MapPin, ArrowRight, Trash2, Loader2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore, useThemeStore } from '../store/store'
import { supabase } from '../services/supabase'
import toast from 'react-hot-toast'

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuthStore()
  const { darkMode } = useThemeStore()

  useEffect(() => {
    if (user) {
      fetchBookmarks()
    }
  }, [user])

  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*, events(*)')
        .eq('user_id', user.id)

      if (error) throw error
      setBookmarks(data || [])
    } catch (err) {
      console.error('Fetch error:', err)
      // Mock data
      setBookmarks([
        { id: '1', events: { id: '1', title: 'CyberTech 2026', date: '2026-05-15', poster_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80', venue: 'North Wing' } },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const removeBookmark = async (id) => {
    try {
      const { error } = await supabase.from('bookmarks').delete().eq('id', id)
      if (error) throw error
      setBookmarks(bookmarks.filter(b => b.id !== id))
      toast.success('Bookmark removed')
    } catch (err) {
      toast.error('Failed to remove bookmark')
    }
  }

  const filteredBookmarks = bookmarks.filter(b => 
    b.events?.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary">
            <Bookmark size={14} className="animate-bounce" />
            Curated Vault
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none italic">
            Saved <span className="text-primary italic neon-glow">Assets</span>
          </h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest pl-1 font-outfit">Your priority campus watch-list</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              darkMode ? 'text-gray-600 group-focus-within:text-primary' : 'text-gray-400 group-focus-within:text-black'
            }`} size={18} />
            <input 
              type="text" 
              placeholder="Search vault..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`h-14 pl-12 pr-4 rounded-2xl outline-none transition-all placeholder:font-light font-medium focus:ring-4 ${
                darkMode ? 'bg-zinc-900 border border-white/10 text-white focus:ring-primary/10' : 'bg-white border-gray-200 shadow-sm'
              }`}
            />
          </div>
          <button className={`p-4 rounded-2xl border transition-all ${
            darkMode ? 'bg-zinc-900 border-white/5 text-white' : 'bg-white border-gray-200'
          }`}>
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1,2,3].map(i => (
             <div key={i} className={`h-80 rounded-[40px] animate-pulse ${darkMode ? 'bg-zinc-900' : 'bg-gray-100'}`} />
          ))
        ) : (
          filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark) => (
              <motion.div
                layout
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-1 group rounded-[40px] overflow-hidden transition-all hover:scale-[1.02] border border-white/5 ${
                  darkMode ? 'bg-white/5' : 'bg-white shadow-xl shadow-gray-200/50'
                }`}
              >
                <div className={`p-8 h-full rounded-[40px] border relative transition-all overflow-hidden ${
                  darkMode ? 'bg-zinc-900 border-white/5 group-hover:border-primary group-hover:shadow-neon' : 'bg-white border-gray-100'
                }`}>
                  <div className="flex gap-6 items-start mb-8 relative z-10">
                     <div className="w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 border border-white/5">
                        <img src={bookmark.events?.poster_url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                     </div>
                     <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none line-clamp-2">{bookmark.events?.title}</h3>
                        <p className="text-[10px] uppercase font-black tracking-widest text-primary opacity-60">Status: Monitored</p>
                     </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5 relative z-10">
                     <div className="flex items-center gap-3 text-xs opacity-50 font-bold tracking-wider italic">
                        <Calendar size={14} className="text-primary" />
                        {new Date(bookmark.events?.date).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-3 text-xs opacity-50 font-bold tracking-wider italic">
                        <MapPin size={14} className="text-primary" />
                        {bookmark.events?.venue || 'Campus Venue'}
                     </div>
                  </div>

                  <div className="flex gap-3 mt-8 relative z-10">
                     <Link 
                       to={`/event/${bookmark.events?.id}`}
                       className={`flex-1 h-12 rounded-2xl border transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest ${
                         darkMode ? 'bg-primary text-black hover:shadow-neon' : 'bg-black text-white'
                       }`}
                     >
                        Access Briefing <ArrowRight size={16} />
                     </Link>
                     <button 
                       onClick={() => removeBookmark(bookmark.id)}
                       className={`w-12 h-12 rounded-2xl border transition-all flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white ${
                         darkMode ? 'bg-zinc-800 border-white/5' : 'bg-red-50 border-red-100'
                       }`}
                     >
                        <Trash2 size={18} />
                     </button>
                  </div>

                  {/* Visual Background Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-[60px] pointer-events-none rounded-full bg-primary" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center space-y-6">
               <div className="inline-flex p-8 rounded-full bg-primary/5 text-primary opacity-20 relative">
                  <Bookmark size={64} strokeWidth={1} />
                  <Sparkles size={24} className="absolute top-4 right-4 animate-pulse" />
               </div>
               <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic italic">Your Vault is Empty</h3>
                  <p className="text-xs uppercase font-black tracking-[0.3em] opacity-30 italic mt-2">Initialize discovery to populate assets</p>
               </div>
               <Link to="/" className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border transition-all ${
                 darkMode ? 'bg-primary text-black hover:shadow-neon' : 'bg-black text-white hover:shadow-lg'
               }`}>
                  Explore Mission Briefings <ArrowRight size={14} />
               </Link>
            </div>
          )
        )}
      </div>

      <footer className="pt-10 flex items-center justify-center gap-4">
         <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse blur-[1px]" />
         <p className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30 italic">Vault Storage Encrypted • System ID: {user?.id.slice(0, 8)}</p>
         <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse blur-[1px]" />
      </footer>
    </div>
  )
}

export default Bookmarks
