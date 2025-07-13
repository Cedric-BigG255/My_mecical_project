import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { 
  MapPin, 
  Search, 
  Filter,
  Phone,
  Clock,
  Star,
  Navigation,
  Heart,
  Shield,
  Truck,
  CreditCard,
  CheckCircle,
  Eye,
  Crosshair,
  Building2
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
  pharmacistInCharge: string;
  distance?: number;
  rating?: number;
  reviews?: number;
  isOpen?: boolean;
  services?: string[];
  verified?: boolean;
  deliveryAvailable?: boolean;
  insuranceAccepted?: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Component to recenter map
const RecenterMap = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);
  return null;
};

const FindPharmacies: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('distance');
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default to NYC

  const services = [
    { id: 'delivery', name: 'Home Delivery', icon: Truck },
    { id: 'insurance', name: 'Insurance Accepted', icon: Shield },
    { id: 'consultation', name: 'Pharmacist Consultation', icon: Heart },
    { id: 'prescription', name: 'Prescription Refills', icon: CheckCircle },
    { id: 'payment', name: 'Card Payment', icon: CreditCard }
  ];

  useEffect(() => {
    fetchPharmacies();
    getUserLocation();
  }, []);

  const fetchPharmacies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('mediflow_token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const baseUrl = 'https://health-agaba-be.onrender.com/api/v1';
      const response = await fetch(`${baseUrl}/pharmacies`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Transform the data to match our interface
        const transformedData = (result.data.data || []).map((pharmacy: any) => ({
          id: pharmacy.id,
          name: pharmacy.name,
          address: pharmacy.address || 'No address provided',
          email: pharmacy.email || 'No email provided',
          phone: pharmacy.phone || 'No phone provided',
          operatingHours: pharmacy.operatingHours || '9:00 AM - 5:00 PM',
          pharmacistInCharge: pharmacy.pharmacistInCharge || 'Not assigned',
          rating: Math.random() * 2 + 3, // Random rating between 3-5
          reviews: Math.floor(Math.random() * 200) + 10, // Random number of reviews
          isOpen: Math.random() > 0.3, // 70% chance of being open
          services: getRandomServices(),
          verified: Math.random() > 0.2, // 80% chance of being verified
          deliveryAvailable: Math.random() > 0.5, // 50% chance of delivery
          insuranceAccepted: getRandomInsurance(),
          coordinates: pharmacy.coordinates || { lat: 40.7128 + (Math.random() * 0.1 - 0.05), lng: -74.0060 + (Math.random() * 0.1 - 0.05) }
        }));
        
        setPharmacies(transformedData);
      } else {
        throw new Error(result.message || 'Failed to fetch pharmacies');
      }
    } catch (err: any) {
      console.error('Error fetching pharmacies:', err);
      setError(err.message || 'An error occurred while fetching pharmacies');
      
      // Use mock data for development
      setPharmacies([
        {
          id: '1',
          name: 'HealthFirst Pharmacy',
          address: '123 Main Street, Downtown, City 12345',
          phone: '+1 (555) 123-4567',
          email: 'contact@healthfirst.com',
          operatingHours: 'Mon-Fri: 8AM-9PM, Sat-Sun: 9AM-7PM',
          pharmacistInCharge: 'Dr. Sarah Johnson',
          distance: 0.5,
          rating: 4.8,
          reviews: 156,
          isOpen: true,
          services: ['delivery', 'insurance', 'consultation', 'prescription', 'payment'],
          verified: true,
          deliveryAvailable: true,
          insuranceAccepted: ['BlueCross', 'Aetna', 'Cigna', 'UnitedHealth'],
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        {
          id: '2',
          name: 'MediCare Plus Pharmacy',
          address: '456 Oak Avenue, Midtown, City 12346',
          phone: '+1 (555) 987-6543',
          email: 'info@medicareplus.com',
          operatingHours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
          pharmacistInCharge: 'Dr. Michael Chen',
          distance: 1.2,
          rating: 4.6,
          reviews: 89,
          isOpen: true,
          services: ['insurance', 'consultation', 'prescription', 'payment'],
          verified: true,
          deliveryAvailable: false,
          insuranceAccepted: ['BlueCross', 'Humana', 'Kaiser'],
          coordinates: { lat: 40.7589, lng: -73.9851 }
        },
        {
          id: '3',
          name: 'QuickMeds Pharmacy',
          address: '789 Pine Street, Uptown, City 12347',
          phone: '+1 (555) 456-7890',
          email: 'support@quickmeds.com',
          operatingHours: 'Mon-Fri: 7AM-10PM, Sat-Sun: 8AM-9PM',
          pharmacistInCharge: 'Dr. Emily Rodriguez',
          distance: 2.1,
          rating: 4.4,
          reviews: 234,
          isOpen: false,
          services: ['delivery', 'prescription', 'payment'],
          verified: true,
          deliveryAvailable: true,
          insuranceAccepted: ['Aetna', 'Cigna', 'Medicaid'],
          coordinates: { lat: 40.7831, lng: -73.9712 }
        },
        {
          id: '4',
          name: 'Community Health Pharmacy',
          address: '321 Elm Drive, Westside, City 12348',
          phone: '+1 (555) 321-0987',
          email: 'hello@communityhealth.com',
          operatingHours: 'Mon-Fri: 8AM-7PM, Sat: 9AM-5PM, Sun: Closed',
          pharmacistInCharge: 'Dr. Robert Kim',
          distance: 3.5,
          rating: 4.7,
          reviews: 67,
          isOpen: true,
          services: ['insurance', 'consultation', 'prescription'],
          verified: false,
          deliveryAvailable: false,
          insuranceAccepted: ['BlueCross', 'UnitedHealth', 'Medicare'],
          coordinates: { lat: 40.7505, lng: -73.9934 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomServices = () => {
    const allServices = ['delivery', 'insurance', 'consultation', 'prescription', 'payment'];
    return allServices.filter(() => Math.random() > 0.3);
  };

  const getRandomInsurance = () => {
    const allInsurance = ['BlueCross', 'Aetna', 'Cigna', 'UnitedHealth', 'Humana', 'Kaiser', 'Medicare', 'Medicaid'];
    return allInsurance.filter(() => Math.random() > 0.5);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(userPos);
          setMapCenter(userPos);
          
          // Calculate distances to pharmacies
          const pharmaciesWithDistance = pharmacies.map(pharmacy => {
            const distance = calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              pharmacy.coordinates.lat,
              pharmacy.coordinates.lng
            );
            return { ...pharmacy, distance };
          });
          
          setPharmacies(pharmaciesWithDistance);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return parseFloat((d * 0.621371).toFixed(1)); // Convert to miles and round to 1 decimal
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    if (selectedServices.length === 0) return true;
    return selectedServices.every(service => pharmacy.services?.includes(service));
  });

  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return (a.distance || 999) - (b.distance || 999);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleSearchLocation = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would use a geocoding service to convert the address to coordinates
    // For this example, we'll just simulate it
    if (searchLocation.trim()) {
      setLoading(true);
      
      // Simulate geocoding delay
      setTimeout(() => {
        // Generate random coordinates near NYC for demo
        const lat = 40.7128 + (Math.random() * 0.1 - 0.05);
        const lng = -74.0060 + (Math.random() * 0.1 - 0.05);
        
        setMapCenter([lat, lng]);
        
        // Recalculate distances
        const pharmaciesWithDistance = pharmacies.map(pharmacy => {
          const distance = calculateDistance(
            lat,
            lng,
            pharmacy.coordinates.lat,
            pharmacy.coordinates.lng
          );
          return { ...pharmacy, distance };
        });
        
        setPharmacies(pharmaciesWithDistance);
        setLoading(false);
      }, 1000);
    }
  };

  if (selectedPharmacy) {
    return (
      <Layout title="Pharmacy Details">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPharmacy(null)}
            className="mb-6 inline-flex items-center text-medical-600 hover:text-medical-700"
          >
            ← Back to Search Results
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-medical-600 to-primary-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold">{selectedPharmacy.name}</h1>
                    {selectedPharmacy.verified && (
                      <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    {selectedPharmacy.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium">{selectedPharmacy.rating}</span>
                        <span className="text-medical-100">({selectedPharmacy.reviews} reviews)</span>
                      </div>
                    )}
                    {selectedPharmacy.distance && (
                      <div className="flex items-center space-x-1">
                        <Navigation className="w-4 h-4" />
                        <span>{selectedPharmacy.distance} miles away</span>
                      </div>
                    )}
                  </div>
                </div>
                {selectedPharmacy.isOpen !== undefined && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedPharmacy.isOpen 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {selectedPharmacy.isOpen ? 'Open Now' : 'Closed'}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{selectedPharmacy.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{selectedPharmacy.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{selectedPharmacy.email}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{selectedPharmacy.operatingHours}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Available</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`flex items-center space-x-3 p-2 rounded-lg ${
                          selectedPharmacy.services?.includes(service.id)
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-50 text-gray-400'
                        }`}
                      >
                        <service.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{service.name}</span>
                        {selectedPharmacy.services?.includes(service.id) && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insurance Accepted */}
              {selectedPharmacy.insuranceAccepted && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Plans Accepted</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPharmacy.insuranceAccepted.map((insurance, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        {insurance}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                  <MapContainer 
                    center={[selectedPharmacy.coordinates.lat, selectedPharmacy.coordinates.lng]} 
                    zoom={15} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker 
                      position={[selectedPharmacy.coordinates.lat, selectedPharmacy.coordinates.lng]} 
                      icon={customIcon}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong>{selectedPharmacy.name}</strong><br />
                          {selectedPharmacy.address}
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                <button className="inline-flex items-center px-6 py-3 bg-medical-600 text-white rounded-lg hover:bg-medical-700">
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </button>
                <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Pharmacy
                </button>
                {selectedPharmacy.deliveryAvailable && (
                  <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Truck className="w-5 h-5 mr-2" />
                    Request Delivery
                  </button>
                )}
                <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Heart className="w-5 h-5 mr-2" />
                  Save as Favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Find Pharmacies">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Nearby Pharmacies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Locate verified pharmacies in your area, check their services, and find the best option for your prescription needs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            {/* Location Search */}
            <form onSubmit={handleSearchLocation} className="flex space-x-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your location (address, city, or ZIP code)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none w-full"
                />
              </div>
              <button 
                type="submit"
                className="px-4 py-3 bg-medical-600 text-white rounded-lg hover:bg-medical-700"
              >
                Search
              </button>
              <button 
                type="button"
                onClick={getUserLocation}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Crosshair className="w-5 h-5" />
              </button>
            </form>

            {/* Services Filter */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filter by services:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedServices.includes(service.id)
                        ? 'bg-medical-100 text-medical-700 border-2 border-medical-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <service.icon className="w-4 h-4 mr-2" />
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Found {sortedPharmacies.length} pharmacies
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none"
                >
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" color="primary" />
            <span className="ml-3 text-gray-600">Searching for pharmacies...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map View */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Map View</h3>
              </div>
              <div className="h-[600px]">
                <MapContainer 
                  center={mapCenter} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Recenter map when center changes */}
                  <RecenterMap position={mapCenter} />
                  
                  {/* User location marker */}
                  {userLocation && (
                    <Marker 
                      position={userLocation} 
                      icon={new Icon({
                        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                        shadowSize: [41, 41]
                      })}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong>Your Location</strong>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                  
                  {/* Pharmacy markers */}
                  {sortedPharmacies.map((pharmacy) => (
                    <Marker 
                      key={pharmacy.id} 
                      position={[pharmacy.coordinates.lat, pharmacy.coordinates.lng]} 
                      icon={customIcon}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong>{pharmacy.name}</strong><br />
                          {pharmacy.address}<br />
                          {pharmacy.distance && <span>{pharmacy.distance} miles away</span>}
                          <div className="mt-2">
                            <button 
                              onClick={() => setSelectedPharmacy(pharmacy)}
                              className="px-2 py-1 bg-medical-600 text-white rounded text-xs hover:bg-medical-700"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Pharmacies List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {sortedPharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedPharmacy(pharmacy)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{pharmacy.name}</h3>
                        {pharmacy.verified && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mb-2">
                        {pharmacy.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{pharmacy.rating}</span>
                            <span className="text-sm text-gray-500">({pharmacy.reviews})</span>
                          </div>
                        )}
                        {pharmacy.distance && (
                          <div className="flex items-center space-x-1">
                            <Navigation className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{pharmacy.distance} miles</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {pharmacy.isOpen !== undefined && (
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pharmacy.isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {pharmacy.isOpen ? 'Open' : 'Closed'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-sm text-gray-600">{pharmacy.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{pharmacy.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{pharmacy.operatingHours}</span>
                    </div>
                  </div>

                  {/* Services Icons */}
                  {pharmacy.services && (
                    <div className="flex items-center space-x-3 mb-4">
                      {pharmacy.deliveryAvailable && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Truck className="w-4 h-4" />
                          <span className="text-xs">Delivery</span>
                        </div>
                      )}
                      {pharmacy.services.includes('insurance') && (
                        <div className="flex items-center space-x-1 text-blue-600">
                          <Shield className="w-4 h-4" />
                          <span className="text-xs">Insurance</span>
                        </div>
                      )}
                      {pharmacy.services.includes('consultation') && (
                        <div className="flex items-center space-x-1 text-purple-600">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">Consultation</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      className="inline-flex items-center text-medical-600 hover:text-medical-700 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {sortedPharmacies.length === 0 && !loading && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pharmacies found</h3>
                  <p className="text-gray-500">Try adjusting your location or filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FindPharmacies;