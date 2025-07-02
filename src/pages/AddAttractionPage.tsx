import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Upload, Clock, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { useAttractions } from '../context/AttractionContext';

const AddAttractionPage: React.FC = () => {
  const navigate = useNavigate();
  const { addAttraction } = useAttractions();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    category: '',
    price: 0,
    openHours: '',
    bestTime: '',
    images: [] as string[],
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // In a real application, we would upload these to a server
      // For this demo, we'll just create object URLs
      const imageFiles = Array.from(e.target.files);
      const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    }
  };

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [name]: parseFloat(value) || 0
      }
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    if (formData.coordinates.latitude === 0 && formData.coordinates.longitude === 0) {
      newErrors.coordinates = 'Coordinates are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send data to a server
      await addAttraction({
        ...formData,
        id: Math.random().toString(36).substring(2, 9), // Generate a random ID
        rating: 0, // New attractions start with 0 rating
        createdAt: new Date().toISOString()
      });
      
      // Navigate to the attractions page after successful submission
      navigate('/attractions');
    } catch (error) {
      console.error('Error adding attraction:', error);
      setErrors({
        submit: 'Failed to add attraction. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Beaches',
    'Mountains',
    'Cultural Sites',
    'Historical Places',
    'Nature',
    'Adventure',
    'Cities',
    'Islands',
    'Temples',
    'Waterfalls'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add New Attraction</h1>
          <p className="text-gray-600">
            Share your discovery with other travelers
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Attraction Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-md ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'} shadow-sm focus:ring focus:ring-opacity-50`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full rounded-md ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'} shadow-sm focus:ring focus:ring-opacity-50`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
                
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="e.g., Bali, Jakarta, Yogyakarta"
                      value={formData.location}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-md ${errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'} shadow-sm focus:ring focus:ring-opacity-50`}
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>
                
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full rounded-md ${errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'} shadow-sm focus:ring focus:ring-opacity-50`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
                
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Entrance Fee
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      placeholder="0 for free attractions"
                      value={formData.price}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 shadow-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Open Hours */}
                <div>
                  <label htmlFor="openHours" className="block text-sm font-medium text-gray-700 mb-1">
                    Open Hours
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="openHours"
                      name="openHours"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      value={formData.openHours}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 shadow-sm"
                    />
                  </div>
                </div>
                
                {/* Best Time */}
                <div>
                  <label htmlFor="bestTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Best Time to Visit
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="bestTime"
                      name="bestTime"
                      placeholder="e.g., Morning, Dry Season (May-September)"
                      value={formData.bestTime}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 shadow-sm"
                    />
                  </div>
                </div>
                
                {/* Coordinates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coordinates <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="latitude" className="block text-xs text-gray-500 mb-1">
                        Latitude
                      </label>
                      <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        placeholder="e.g., -8.409518"
                        step="any"
                        value={formData.coordinates.latitude || ''}
                        onChange={handleCoordinateChange}
                        className={`w-full rounded-md ${errors.coordinates ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'} shadow-sm focus:ring focus:ring-opacity-50`}
                      />
                    </div>
                    <div>
                      <label htmlFor="longitude" className="block text-xs text-gray-500 mb-1">
                        Longitude
                      </label>
                      <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        placeholder="e.g., 115.188919"
                        step="any"
                        value={formData.coordinates.longitude || ''}
                        onChange={handleCoordinateChange}
                        className={`w-full rounded-md ${errors.coordinates ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'} shadow-sm focus:ring focus:ring-opacity-50`}
                      />
                    </div>
                  </div>
                  {errors.coordinates && (
                    <p className="mt-1 text-sm text-red-600">{errors.coordinates}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    You can get coordinates from Google Maps by right-clicking on the location and selecting "What's here?"
                  </p>
                </div>
                
                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.images ? 'border-red-300' : 'border-gray-300'}`}>
                    <div className="flex items-center justify-center">
                      <label htmlFor="image-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        <Upload className="h-5 w-5 inline mr-2" />
                        Select Images
                        <input
                          id="image-upload"
                          name="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    
                    {formData.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative h-20 rounded-md overflow-hidden">
                            <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index)
                                }));
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Error message */}
            {errors.submit && (
              <div className="mt-6 p-4 bg-red-50 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <span className="text-sm text-red-700">{errors.submit}</span>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Add Attraction'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAttractionPage;