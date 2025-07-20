import React, { useState, useEffect } from 'react';
import { Wifi, Search, MapPin, Building, ArrowLeft, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin as LocationPin } from 'lucide-react';
import Selector from './components/Selector';
import PlanCard from './components/PlanCard';
import ProviderCard from './components/ProviderCard';
import Stepper from './components/Stepper';
import FAQ from './components/FAQ';
// import CoverageChecker from './components/CoverageChecker';
import { mockPlans, regionOptions, developmentOptions, providers, faqData } from './data/mockData';
import { Plan, StepperData, ContactForm } from './types';

function App() {
  const [stepperData, setStepperData] = useState<StepperData>({
    step: 1,
    selectorMode: 'region',
    selectedOption: '',
    selectedPlan: null,
    selectedProvider: '',
    contactInfo: {
      name: '',
      phone_number: '',
      preferred_language: 'en' as 'en' | 'af' | 'zu',
      manual_location: ''
    }
  });

  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = ['Select Area', 'Choose Plan', 'Pick Provider', 'Contact Info'];

  useEffect(() => {
    if (stepperData.selectedOption) {
      const filtered = mockPlans.filter(plan => 
        stepperData.selectorMode === 'region' 
          ? plan.region === stepperData.selectedOption 
          : plan.development === stepperData.selectedOption
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans([]);
    }
  }, [stepperData.selectedOption, stepperData.selectorMode]);

  useEffect(() => {
    if (stepperData.selectedPlan) {
      const planProviders = mockPlans
        .filter(plan => 
          plan.region === stepperData.selectedPlan?.region && 
          plan.development === stepperData.selectedPlan?.development
        )
        .map(plan => plan.provider!)
        .filter((provider, index, self) => self.indexOf(provider) === index);
      
      setAvailableProviders(planProviders);
    }
  }, [stepperData.selectedPlan]);

  const handleSelectorModeChange = (mode: 'region' | 'development') => {
    setStepperData(prev => ({
      ...prev,
      selectorMode: mode,
      selectedOption: '',
      selectedPlan: null,
      selectedProvider: '',
      step: 1
    }));
  };

  const handleOptionSelect = (option: string) => {
    setStepperData(prev => ({
      ...prev,
      selectedOption: option,
      selectedPlan: null,
      selectedProvider: '',
      step: 2
    }));
  };

  const handlePlanSelect = (plan: Plan) => {
    setStepperData(prev => ({
      ...prev,
      selectedPlan: plan,
      selectedProvider: '',
      step: 3
    }));
  };

  const handleProviderSelect = (providerId: string) => {
    setStepperData(prev => ({
      ...prev,
      selectedProvider: providerId,
      step: 4
    }));
  };

  const handleContactInfoChange = (field: keyof ContactForm, value: string) => {
    setStepperData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    // Prepare data for Supabase customers table
    const customerData = {
      name: stepperData.contactInfo.name,
      phone_number: stepperData.contactInfo.phone_number,
      preferred_language: stepperData.contactInfo.preferred_language,
      manual_location: stepperData.contactInfo.manual_location,
      selected_area: stepperData.selectedOption,
      area_type: stepperData.selectorMode,
      selected_plan_title: stepperData.selectedPlan?.title,
      selected_plan_speed: stepperData.selectedPlan?.speed,
      selected_plan_price: stepperData.selectedPlan?.price,
      selected_provider_name: providers.find(p => p.id === stepperData.selectedProvider)?.name,
      status: 'pending',
      current_journey_stage: 'consideration'
    };

    try {
      const response = await fetch('https://hook.eu2.make.com/s79debs28rc0f9vzxacyw4ww8joj5ctv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      
      if (response.ok) {
        alert('Thank you! We\'ll be in touch soon with your personalized quote.');
        // Reset stepper
        setStepperData({
          step: 1,
          selectorMode: 'region',
          selectedOption: '',
          selectedPlan: null,
          selectedProvider: '',
          contactInfo: {
            name: '',
            phone_number: '',
            preferred_language: 'en' as 'en' | 'af' | 'zu',
            manual_location: ''
          }
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      alert('Sorry, there was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (stepperData.step > 1) {
      setStepperData(prev => ({
        ...prev,
        step: prev.step - 1
      }));
    }
  };

  const canProceed = () => {
    switch (stepperData.step) {
      case 1: return stepperData.selectedOption !== '';
      case 2: return stepperData.selectedPlan !== null;
      case 3: return stepperData.selectedProvider !== '';
      case 4: return stepperData.contactInfo.name && 
                     stepperData.contactInfo.phone_number && 
                     stepperData.contactInfo.manual_location;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Combined Header and Hero Section with Diagonal Gradient */}
      <section className="bg-gradient-to-br from-[#210EC7] to-[#5DF596] text-white">
        {/* Logo Header */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <img 
              src="https://static.wixstatic.com/media/1420b0_7ffb91f8f06e47f08a3e2f74031443e8~mv2.png/v1/fill/w_600,h_413,al_c,lg_1,q_85,enc_avif,quality_auto/Loop%20Logo%20no%20backgtround.png" 
              alt="Loop ISP Logo" 
              className="h-20 w-auto"
            />
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Superfast, affordable fibre.{' '}
              <span className="whitespace-nowrap">No BS.</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              From gated estates to busy suburbs, we connect you—and we care when it breaks.
            </p>
            <button
              onClick={() => document.getElementById('stepper')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Find your plan
            </button>
          </div>
        </div>
      </section>

      {/* Stepper Section */}
      <section id="stepper" className="py-16 px-4">
        <div className="max-w-6xl mx-auto min-h-[70vh] flex flex-col justify-center">
          <Stepper currentStep={stepperData.step} steps={steps} />

          {/* Step 1: Area Selection */}
          {stepperData.step === 1 && (
            <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choose your area to see available plans
                </h2>
                <p className="text-lg text-gray-600">
                  Select by region or development type to find plans tailored to your location
                </p>
              </div>
              
              <Selector
                mode={stepperData.selectorMode}
                options={stepperData.selectorMode === 'region' ? regionOptions : developmentOptions}
                onSelect={handleOptionSelect}
                onModeChange={handleSelectorModeChange}
              />

              {stepperData.selectedOption && (
                <div className="mt-4 text-center">
                  <p className="text-gray-600 flex items-center justify-center">
                    {stepperData.selectorMode === 'region' ? <MapPin className="h-4 w-4 mr-1" /> : <Building className="h-4 w-4 mr-1" />}
                    Selected <span className="font-semibold ml-1">{stepperData.selectedOption}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {stepperData.step === 2 && (
            <div className="max-w-6xl mx-auto flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Available Plans in {stepperData.selectedOption}
                </h2>
                <p className="text-lg text-gray-600">
                  Choose the plan that best fits your needs
                </p>
              </div>
              
              {filteredPlans.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No plans available for this selection. Please try another option.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlans.map(plan => (
                    <div 
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan)}
                      className={`cursor-pointer transition-all ${
                        stepperData.selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <PlanCard
                        title={plan.title}
                        speed={plan.speed}
                        price={plan.price}
                        features={plan.features}
                        bestValue={plan.bestValue}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Provider Selection */}
          {stepperData.step === 3 && (
            <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choose Your Provider
                </h2>
                <p className="text-lg text-gray-600">
                  Select from available providers in your area
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers
                  .filter(provider => availableProviders.includes(provider.name))
                  .map(provider => (
                    <ProviderCard
                      key={provider.id}
                      {...provider}
                      onSelect={handleProviderSelect}
                      isSelected={stepperData.selectedProvider === provider.id}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {stepperData.step === 4 && (
            <div className="max-w-md mx-auto flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Almost Done!
                </h2>
                <p className="text-lg text-gray-600">
                  Enter your details to get your personalized quote
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={stepperData.contactInfo.name}
                    onChange={(e) => handleContactInfoChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={stepperData.contactInfo.phone_number}
                    onChange={(e) => handleContactInfoChange('phone_number', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={stepperData.contactInfo.preferred_language}
                    onChange={(e) => handleContactInfoChange('preferred_language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="af">Afrikaans</option>
                    <option value="zu">Zulu</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Your Location/Address"
                    value={stepperData.contactInfo.manual_location}
                    onChange={(e) => handleContactInfoChange('manual_location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Your Selection:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Area:</span> {stepperData.selectedOption}</p>
                    <p><span className="font-medium">Plan:</span> {stepperData.selectedPlan?.title} - {stepperData.selectedPlan?.speed}</p>
                    <p><span className="font-medium">Provider:</span> {providers.find(p => p.id === stepperData.selectedProvider)?.name}</p>
                    <p><span className="font-medium">Price:</span> {stepperData.selectedPlan?.price}/month</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 max-w-4xl mx-auto space-x-4">
            <button
              onClick={handleBack}
              disabled={stepperData.step === 1}
              className="flex items-center px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>

            {stepperData.step < 4 ? (
              <button
                onClick={() => setStepperData(prev => ({ ...prev, step: prev.step + 1 }))}
                disabled={!canProceed()}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get My Quote'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#EAEBFF]">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="bg-white rounded-lg shadow-md">
            {faqData.map((faq, index) => (
              <FAQ
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <img 
                src="https://static.wixstatic.com/media/1420b0_7ffb91f8f06e47f08a3e2f74031443e8~mv2.png/v1/fill/w_600,h_413,al_c,lg_1,q_85,enc_avif,quality_auto/Loop%20Logo%20no%20backgtround.png" 
                alt="Loop ISP Logo" 
                className="h-16 w-auto"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                Superfast, affordable fibre internet for South African homes and businesses. 
                Connecting communities with reliable, high-speed internet that just works.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Home</a></li>
                <li><a href="#stepper" className="text-gray-300 hover:text-white transition-colors text-sm">Find Plans</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Coverage Areas</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Business Solutions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Technical Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Installation Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Network Status</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Speed Test</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Report Fault</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Sales: 087 550 5667</p>
                    <p className="text-gray-300 text-sm">Support: 087 550 5668</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">hello@loopisp.co.za</p>
                    <p className="text-gray-300 text-sm">support@loopisp.co.za</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <LocationPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    123 Fibre Street<br />
                    Cape Town, 8001<br />
                    South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Acceptable Use Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">POPIA Compliance</a>
              </div>
              <p className="text-gray-400 text-sm">
                © 2025 Loop ISP. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 hidden">
        <a
          href="https://loopisp.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>

      {/* ElevenLabs Voice Assistant Widget */}
      <div className="fixed bottom-20 right-6 z-40">
        <div dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="agent_01jzd6x5jffq6tg7611df13996"></elevenlabs-convai>`
        }} />
      </div>
    </div>
  );
}

export default App;