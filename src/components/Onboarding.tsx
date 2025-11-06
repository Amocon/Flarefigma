import { useState } from 'react';
import { LoginScreen } from './onboarding/LoginScreen';
import { RoleSelectionScreen } from './onboarding/RoleSelectionScreen';
import { CreateFlatFlow } from './onboarding/CreateFlatFlow';
import { JoinFlatFlow } from './onboarding/JoinFlatFlow';
import { ApplicantProfileFlow } from './onboarding/ApplicantProfileFlow';

type OnboardingStep = 
  | 'login' 
  | 'role-selection' 
  | 'create-flat' 
  | 'join-flat' 
  | 'applicant-profile';

interface OnboardingProps {
  onComplete: (userRole: 'resident' | 'applicant') => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('login');

  const handleLoginComplete = () => {
    setCurrentStep('role-selection');
  };

  const handleRoleSelect = (role: OnboardingStep) => {
    setCurrentStep(role);
  };

  const handleCreateFlatComplete = () => {
    onComplete('resident');
  };

  const handleJoinFlatComplete = () => {
    onComplete('resident');
  };

  const handleApplicantProfileComplete = () => {
    onComplete('applicant');
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {currentStep === 'login' && (
          <LoginScreen onComplete={handleLoginComplete} />
        )}
        
        {currentStep === 'role-selection' && (
          <RoleSelectionScreen onRoleSelect={handleRoleSelect} />
        )}
        
        {currentStep === 'create-flat' && (
          <CreateFlatFlow 
            onComplete={handleCreateFlatComplete}
            onBack={() => setCurrentStep('role-selection')}
          />
        )}
        
        {currentStep === 'join-flat' && (
          <JoinFlatFlow 
            onComplete={handleJoinFlatComplete}
            onBack={() => setCurrentStep('role-selection')}
          />
        )}
        
        {currentStep === 'applicant-profile' && (
          <ApplicantProfileFlow 
            onComplete={handleApplicantProfileComplete}
            onBack={() => setCurrentStep('role-selection')}
          />
        )}
      </div>
    </div>
  );
}
