import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag, Loader2, Share2 } from 'lucide-react';
import { getCombinedNews } from '../services/newsService';
import { PageType, NewsArticle } from '../types';

interface NewsArticlePageProps {
  articleId: number;
  onNavigate: (view: PageType) => void;
}

const NewsArticlePage: React.FC<NewsArticlePageProps> = ({ articleId, onNavigate }) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const allNews = await getCombinedNews();
        const found = allNews.find(n => n.id === articleId);
        setArticle(found || null);
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center bg-stone-50">
        <Loader2 className="h-12 w-12 text-cardio-600 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-stone-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Novica ni bila najdena</h2>
        <button 
          onClick={() => onNavigate('novice-page')}
          className="text-cardio-600 hover:text-cardio-700 font-medium flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Nazaj na novice
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-stone-50 min-h-screen flex flex-col">
      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 relative">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cardio-600 text-white mb-4">
              <Tag className="h-3 w-3 mr-1" />
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Meta header */}
          <div className="flex flex-wrap items-center justify-between text-gray-500 text-sm mb-8 pb-8 border-b border-stone-100">
            <div className="flex items-center mb-4 sm:mb-0">
              <Calendar className="h-4 w-4 mr-2 text-cardio-500" />
              <span className="font-medium">{article.date}</span>
            </div>
            
            {/* Share placeholder */}
            <button className="flex items-center text-gray-400 hover:text-cardio-600 transition-colors">
              <Share2 className="h-4 w-4 mr-2" />
              Delite novico
            </button>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none text-gray-700 leading-relaxed mb-12">
            {article.summary.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Additional Images Gallery (Zigzag Layout) */}
          {article.images && article.images.length > 1 && (
            <div className="flex flex-col gap-12 mb-12">
              {article.images.slice(1).map((imgUrl, index) => (
                <div 
                  key={index} 
                  className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="w-full md:w-2/3 lg:w-1/2">
                    <img 
                      src={imgUrl} 
                      alt={`Slika ${index + 2} - ${article.title}`} 
                      className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Back Button */}
          <div className="mt-12 pt-8 border-t border-stone-100 flex justify-center">
            <button 
              onClick={() => onNavigate('novice-page')}
              className="px-8 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full font-bold transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazaj na vse novice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;
