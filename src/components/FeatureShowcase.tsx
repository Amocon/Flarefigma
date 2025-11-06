import { Layout, UserPlus, Home, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FeatureShowcaseProps {
  onSelectFeature: (feature: 'main' | 'onboarding' | 'floorplan') => void;
}

export function FeatureShowcase({ onSelectFeature }: FeatureShowcaseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm mb-6">
            <span className="text-5xl">🏠</span>
          </div>
          <h1 className="text-white mb-3">Flare App Features</h1>
          <p className="text-white/80">
            Select a feature to explore
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {/* Main App */}
          <button
            onClick={() => onSelectFeature('main')}
            className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-[1.02] text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Home size={28} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3>Main App Experience</h3>
                  <Badge variant="secondary" className="rounded-full text-xs">
                    Complete
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Full WG search, application management, and profile features for both applicants and residents
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full text-xs">
                    Cards View
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Map View
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Swipe Mode
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Applications
                  </Badge>
                </div>
              </div>
            </div>
          </button>

          {/* Onboarding */}
          <button
            onClick={() => onSelectFeature('onboarding')}
            className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-[1.02] text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <UserPlus size={28} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3>Onboarding Flow</h3>
                  <Badge className="rounded-full text-xs bg-[var(--flare-green)]">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete account setup with login, role selection, and guided flows for creating/joining flats
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full text-xs">
                    Login
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Create Flat
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Join Flat
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Profile Setup
                  </Badge>
                </div>
              </div>
            </div>
          </button>

          {/* Floor Plan */}
          <button
            onClick={() => onSelectFeature('floorplan')}
            className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-[1.02] text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Layout size={28} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3>AI Floor Plan Detection</h3>
                  <Badge className="rounded-full text-xs bg-[var(--flare-green)]">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload floor plans and let AI automatically detect rooms, calculate sizes, and identify shared spaces
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full text-xs">
                    Auto-Detection
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Interactive Edit
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Zoom & Pan
                  </Badge>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
          <p className="text-xs text-white/80 text-center">
            💡 All features can be accessed via the demo controls in the app
          </p>
        </div>
      </div>
    </div>
  );
}
