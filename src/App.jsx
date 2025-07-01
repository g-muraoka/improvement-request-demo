import React, { useState } from 'react';
import { MessageSquare, Send, Star, User, Calendar, Tag } from 'lucide-react';

const ImprovementRequestForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: '',
    userInfo: {
      name: '',
      email: '',
      department: ''
    }
  });
  
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    '画面・UI改善',
    '機能追加',
    'パフォーマンス改善',
    'バグ修正',
    'セキュリティ',
    'その他'
  ];

  const priorities = [
    { value: 'low', label: '低', color: 'text-green-600' },
    { value: 'medium', label: '中', color: 'text-yellow-600' },
    { value: 'high', label: '高', color: 'text-red-600' }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 送信処理のシミュレーション
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">送信完了</h2>
          <p className="text-gray-600 mb-6">
            改善要望を受け付けました。<br />
            ご協力ありがとうございます。
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                category: '',
                title: '',
                description: '',
                priority: '',
                userInfo: { name: '', email: '', department: '' }
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            新しい要望を送信
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">システム改善要望</h1>
              <p className="text-gray-600">より良いシステムのために、ご意見をお聞かせください</p>
            </div>
          </div>
        </div>

        {/* メインフォーム */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-6" onSubmit={handleSubmit}>
            {/* ユーザー情報セクション */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                ユーザー情報
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.userInfo.name}
                    onChange={(e) => handleInputChange('userInfo.name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.userInfo.email}
                    onChange={(e) => handleInputChange('userInfo.email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="yamada@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    部署
                  </label>
                  <input
                    type="text"
                    value={formData.userInfo.department}
                    onChange={(e) => handleInputChange('userInfo.department', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="営業部"
                  />
                </div>
              </div>
            </div>

            {/* 要望内容セクション */}
            <div>
              <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <Tag className="w-5 h-5 mr-2 text-blue-600" />
                要望内容
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリー <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    優先度 <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  要望タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例：検索機能の改善について"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  詳細内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={`現在の問題点や改善してほしい内容を具体的にご記入ください。\n\n例：\n・現在の問題：検索結果が多すぎて目的の情報が見つけにくい\n・改善案：カテゴリー別のフィルター機能を追加してほしい\n・期待する効果：作業効率が向上する`}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    具体的に記述いただくと、より良い改善につながります
                  </span>
                  <span className="text-sm text-gray-400">
                    {formData.description.length}/1000文字
                  </span>
                </div>
              </div>
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-center pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>要望を送信</span>
              </button>
            </div>
          </div>
        </div>

        {/* フッター情報 */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mt-6">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>要望は1営業日以内に確認いたします</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>重要度が高いものから優先的に対応します</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementRequestForm;