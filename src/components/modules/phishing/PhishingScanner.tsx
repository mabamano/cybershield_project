
import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Loader2, X, AlertCircle, Info } from 'lucide-react';
import GlassContainer from '../../ui-custom/GlassContainer';
import { cn } from '@/lib/utils';

interface ScanResult {
  threatLevel: 'low' | 'medium' | 'high';
  score: number;
  indicators: {
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  recommendations: string[];
}

const PhishingScanner = () => {
  const [emailContent, setEmailContent] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulated scan function - would be replaced with actual ML or heuristic analysis
  const scanEmail = async (content: string): Promise<ScanResult> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple heuristic checks (for demonstration)
    const hasUrgencyWords = /urgent|immediately|alert|attention|important|verify|suspend|restrict/i.test(content);
    const hasSuspiciousLinks = /bit\.ly|tinyurl|click here|login|verify|account/i.test(content);
    const hasBadGrammar = /kindly|dear customer|valued customer/i.test(content);
    const requestsPersonalInfo = /password|ssn|social security|credit card|bank account|verify your/i.test(content);
    
    // Count matches to determine threat level
    let threatCount = 0;
    if (hasUrgencyWords) threatCount++;
    if (hasSuspiciousLinks) threatCount++;
    if (hasBadGrammar) threatCount++;
    if (requestsPersonalInfo) threatCount++;
    
    const indicators = [];
    if (hasUrgencyWords) {
      indicators.push({
        type: 'Urgency Language',
        description: 'Email contains language creating a false sense of urgency',
        severity: 'medium' as const
      });
    }
    
    if (hasSuspiciousLinks) {
      indicators.push({
        type: 'Suspicious Links',
        description: 'Email contains potentially malicious or shortened links',
        severity: 'high' as const
      });
    }
    
    if (hasBadGrammar) {
      indicators.push({
        type: 'Style Inconsistencies',
        description: 'Email contains unusual phrasing or grammar issues common in phishing',
        severity: 'low' as const
      });
    }
    
    if (requestsPersonalInfo) {
      indicators.push({
        type: 'Personal Information Request',
        description: 'Email requests sensitive personal information',
        severity: 'high' as const
      });
    }
    
    let threatLevel: 'low' | 'medium' | 'high' = 'low';
    let score = 0;
    
    if (threatCount >= 3) {
      threatLevel = 'high';
      score = Math.floor(70 + Math.random() * 30); // 70-100
    } else if (threatCount >= 1) {
      threatLevel = 'medium';
      score = Math.floor(30 + Math.random() * 40); // 30-70
    } else {
      threatLevel = 'low';
      score = Math.floor(Math.random() * 30); // 0-30
    }
    
    const recommendations = [
      'Do not click on any links in the email',
      'Do not reply to the sender or provide any personal information',
      'Check the sender\'s email address carefully for inconsistencies',
      'Contact the purported organization directly using their official contact information',
      'Report the email as phishing to your email provider'
    ];
    
    return {
      threatLevel,
      score,
      indicators,
      recommendations
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailContent.trim()) {
      setError('Please enter email content to scan');
      return;
    }
    
    setScanning(true);
    setError(null);
    setResult(null);
    
    try {
      const scanResult = await scanEmail(emailContent);
      setResult(scanResult);
    } catch (err) {
      console.error('Error scanning email:', err);
      setError('An error occurred while scanning the email. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const handleClear = () => {
    setEmailContent('');
    setResult(null);
    setError(null);
  };

  const getThreatColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return 'text-cybershield-danger';
      case 'medium':
        return 'text-cybershield-warning';
      case 'low':
        return 'text-cybershield-success';
      default:
        return '';
    }
  };

  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-cybershield-danger" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-cybershield-warning" />;
      case 'low':
        return <Info className="w-4 h-4 text-cybershield-success" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GlassContainer className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Email Content Analysis</h3>
            <p className="text-cybershield-400 text-sm">
              Paste the content of a suspicious email to scan for phishing indicators
            </p>
          </div>
          
          <div className="mb-4">
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste email content here..."
              className="cybershield-input h-60"
              disabled={scanning}
            />
            {error && (
              <div className="mt-2 text-cybershield-danger text-sm flex items-start">
                <AlertTriangle className="w-4 h-4 mr-1 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center text-cybershield-400 hover:text-cybershield-500 text-sm transition-colors"
              disabled={scanning || (!emailContent && !result)}
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </button>
            
            <button
              type="submit"
              disabled={scanning || !emailContent.trim()}
              className="cybershield-button flex items-center"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Analyze Email
                </>
              )}
            </button>
          </div>
        </form>
      </GlassContainer>
      
      <GlassContainer 
        className={cn(
          "p-6 transition-all",
          result ? "animate-fade-in" : "opacity-50"
        )}
      >
        {result ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-medium mb-1">Scan Results</h3>
                <p className="text-cybershield-400 text-sm">
                  Analysis of potential phishing indicators
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div 
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4",
                    result.threatLevel === 'high' ? 'border-cybershield-danger text-cybershield-danger' :
                    result.threatLevel === 'medium' ? 'border-cybershield-warning text-cybershield-warning' :
                    'border-cybershield-success text-cybershield-success'
                  )}
                >
                  {result.score}%
                </div>
                <span className={cn(
                  "mt-1 font-medium",
                  getThreatColor(result.threatLevel)
                )}>
                  {result.threatLevel === 'high' ? 'High Risk' :
                   result.threatLevel === 'medium' ? 'Medium Risk' :
                   'Low Risk'}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">Detected Indicators</h4>
              <div className="space-y-2">
                {result.indicators.length > 0 ? (
                  result.indicators.map((indicator, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(indicator.severity)}
                        <span className="font-medium">{indicator.type}</span>
                      </div>
                      <p className="mt-1 text-sm text-cybershield-400">
                        {indicator.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="bg-cybershield-success/5 rounded-lg p-3 border border-cybershield-success/10 text-cybershield-success flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 shrink-0" />
                    <span>No phishing indicators detected in this email.</span>
                  </div>
                )}
              </div>
            </div>
            
            {result.threatLevel !== 'low' && (
              <div>
                <h4 className="text-lg font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1 text-sm">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-4 h-4 mr-2 text-cybershield-accent">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-cybershield-100/50 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-cybershield-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
            <p className="text-cybershield-400 max-w-xs">
              Paste an email in the input field and click "Analyze Email" to check for phishing indicators
            </p>
          </div>
        )}
      </GlassContainer>
    </div>
  );
};

export default PhishingScanner;
