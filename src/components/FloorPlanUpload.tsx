import { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  UploadCloud, 
  Image as ImageIcon, 
  FileText, 
  Loader2,
  CheckCircle,
  Edit2,
  Home,
  Users,
  Layout,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Room {
  id: string;
  name: string;
  size: string;
  rent: string;
  type: 'private' | 'shared';
  position: { x: number; y: number; width: number; height: number };
}

interface FloorPlanUploadProps {
  onBack?: () => void;
  onComplete?: (rooms: Room[]) => void;
}

export function FloorPlanUpload({ onBack, onComplete }: FloorPlanUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated AI-detected rooms
  const [detectedRooms, setDetectedRooms] = useState<Room[]>([]);

  const handleFileSelect = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setUploadedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
      
      // Start analysis
      analyzeFloorPlan();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const analyzeFloorPlan = () => {
    setIsAnalyzing(true);
    setIsAnalyzed(false);

    // Simulate AI analysis
    setTimeout(() => {
      // Mock detected rooms with positions
      const mockRooms: Room[] = [
        {
          id: '1',
          name: 'Room 1',
          size: '14',
          rent: '450',
          type: 'private',
          position: { x: 10, y: 10, width: 30, height: 35 }
        },
        {
          id: '2',
          name: 'Room 2',
          size: '16',
          rent: '520',
          type: 'private',
          position: { x: 45, y: 10, width: 32, height: 35 }
        },
        {
          id: '3',
          name: 'Living Room',
          size: '25',
          rent: '',
          type: 'shared',
          position: { x: 10, y: 50, width: 40, height: 25 }
        },
        {
          id: '4',
          name: 'Kitchen',
          size: '12',
          rent: '',
          type: 'shared',
          position: { x: 55, y: 50, width: 22, height: 25 }
        },
        {
          id: '5',
          name: 'Bathroom',
          size: '8',
          rent: '',
          type: 'shared',
          position: { x: 10, y: 80, width: 20, height: 15 }
        },
      ];

      setDetectedRooms(mockRooms);
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 2500);
  };

  const handleReanalyze = () => {
    analyzeFloorPlan();
  };

  const updateRoom = (id: string, field: keyof Room, value: string) => {
    setDetectedRooms(rooms =>
      rooms.map(room =>
        room.id === id ? { ...room, [field]: value } : room
      )
    );
  };

  const handleConfirm = () => {
    if (onComplete) {
      onComplete(detectedRooms);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          {onBack ? (
            <button onClick={onBack} className="text-white">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-6" />
          )}
          <h2 className="text-white">Upload Floor Plan</h2>
          <div className="w-6" /> {/* Spacer */}
        </div>
        <p className="text-sm text-white/80 text-center">
          AI will automatically detect rooms and dimensions
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Upload Area */}
        {!uploadedFile && (
          <div className="p-6">
            <div className="max-w-sm mx-auto">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-8 transition-all ${
                  isDragging
                    ? 'border-[var(--flare-green)] bg-[var(--flare-green)]/5'
                    : 'border-border bg-white'
                }`}
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--flare-green)]/10">
                    <UploadCloud size={40} className="text-[var(--flare-green)]" />
                  </div>
                  
                  <div>
                    <h3 className="mb-2">Upload Floor Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your file here or click to browse
                    </p>
                  </div>

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl"
                  >
                    <UploadCloud size={18} className="mr-2" />
                    Choose File
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ImageIcon size={14} />
                      <span>JPG</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ImageIcon size={14} />
                      <span>PNG</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText size={14} />
                      <span>PDF</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[var(--flare-highlight)]/30 border border-[var(--flare-highlight)]">
                <p className="text-xs text-muted-foreground text-center">
                  💡 Our AI will automatically detect rooms and estimate their sizes
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analyzing State */}
        {uploadedFile && isAnalyzing && (
          <div className="p-6">
            <div className="max-w-sm mx-auto">
              <div className="bg-white rounded-3xl p-8 border border-border">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--flare-green)]/10">
                    <Loader2 size={40} className="text-[var(--flare-green)] animate-spin" />
                  </div>
                  
                  <div>
                    <h3 className="mb-2">Analyzing Floor Plan...</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is detecting rooms and calculating dimensions
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Detecting rooms</span>
                      <CheckCircle size={16} className="text-[var(--flare-green)]" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Calculating sizes</span>
                      <Loader2 size={16} className="text-[var(--flare-green)] animate-spin" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Identifying shared spaces</span>
                      <div className="w-4 h-4 rounded-full border-2 border-border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analyzed Results */}
        {uploadedFile && isAnalyzed && (
          <div className="p-6 space-y-6">
            {/* Success Message */}
            <div className="max-w-sm mx-auto">
              <div className="bg-[var(--flare-green)]/10 border border-[var(--flare-green)] rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-[var(--flare-green)] shrink-0" />
                  <div>
                    <h4 className="text-sm">Analysis Complete!</h4>
                    <p className="text-xs text-muted-foreground">
                      {detectedRooms.length} areas detected
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floor Plan Viewer */}
            <div className="max-w-sm mx-auto">
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                {/* Zoom Controls */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                  <h4 className="text-sm">Detected Layout</h4>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleZoomOut}
                      className="h-8 w-8 p-0 rounded-lg"
                      disabled={zoom <= 0.5}
                    >
                      <ZoomOut size={16} />
                    </Button>
                    <span className="text-xs text-muted-foreground w-12 text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleZoomIn}
                      className="h-8 w-8 p-0 rounded-lg"
                      disabled={zoom >= 2}
                    >
                      <ZoomIn size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleResetZoom}
                      className="h-8 w-8 p-0 rounded-lg"
                    >
                      <RotateCcw size={16} />
                    </Button>
                  </div>
                </div>

                {/* Floor Plan with Overlays */}
                <div className="relative bg-muted/20 overflow-auto" style={{ maxHeight: '400px' }}>
                  <div 
                    className="relative inline-block min-w-full"
                    style={{ 
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top left',
                      transition: 'transform 0.2s'
                    }}
                  >
                    {/* Floor Plan Image */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-auto"
                      style={{ minHeight: '300px' }}
                    >
                      {/* Background */}
                      <rect x="0" y="0" width="100" height="100" fill="#f5f5f5" />
                      
                      {/* Room Overlays */}
                      {detectedRooms.map((room) => (
                        <g key={room.id}>
                          {/* Room Rectangle */}
                          <rect
                            x={room.position.x}
                            y={room.position.y}
                            width={room.position.width}
                            height={room.position.height}
                            fill={selectedRoomId === room.id ? '#93c47d' : '#93c47d'}
                            fillOpacity={selectedRoomId === room.id ? 0.4 : 0.2}
                            stroke="#93c47d"
                            strokeWidth="0.5"
                            className="cursor-pointer transition-all"
                            onClick={() => setSelectedRoomId(room.id)}
                          />
                          
                          {/* Room Label */}
                          <text
                            x={room.position.x + room.position.width / 2}
                            y={room.position.y + room.position.height / 2 - 1}
                            textAnchor="middle"
                            fontSize="3"
                            fontWeight="600"
                            fill="#38761d"
                            className="pointer-events-none"
                          >
                            {room.name}
                          </text>
                          <text
                            x={room.position.x + room.position.width / 2}
                            y={room.position.y + room.position.height / 2 + 2.5}
                            textAnchor="middle"
                            fontSize="2.5"
                            fill="#38761d"
                            className="pointer-events-none"
                          >
                            {room.size} m²
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Legend */}
                <div className="p-4 bg-muted/30 border-t border-border">
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[var(--flare-green)]/40 border border-[var(--flare-green)]" />
                      <span className="text-muted-foreground">Tap to edit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Room List */}
            <div className="max-w-sm mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3>Detected Rooms</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReanalyze}
                  className="rounded-xl"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reanalyze
                </Button>
              </div>

              <div className="space-y-3">
                {detectedRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`bg-white rounded-2xl border p-4 transition-all ${
                      selectedRoomId === room.id
                        ? 'border-[var(--flare-green)] shadow-md'
                        : 'border-border'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Room Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {room.type === 'private' ? (
                            <Home size={18} className="text-[var(--flare-green)]" />
                          ) : (
                            <Users size={18} className="text-[var(--flare-brown)]" />
                          )}
                          <Input
                            value={room.name}
                            onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                            className="h-8 rounded-lg border-none p-0 focus-visible:ring-0"
                          />
                        </div>
                        <button
                          onClick={() => setSelectedRoomId(room.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>

                      {/* Room Details */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label className="text-xs mb-1 block">Size (m²)</Label>
                          <Input
                            value={room.size}
                            onChange={(e) => updateRoom(room.id, 'size', e.target.value)}
                            className="rounded-lg h-9"
                            type="number"
                          />
                        </div>
                        {room.type === 'private' && (
                          <div>
                            <Label className="text-xs mb-1 block">Rent (€)</Label>
                            <Input
                              value={room.rent}
                              onChange={(e) => updateRoom(room.id, 'rent', e.target.value)}
                              className="rounded-lg h-9"
                              type="number"
                            />
                          </div>
                        )}
                        <div>
                          <Label className="text-xs mb-1 block">Type</Label>
                          <Select
                            value={room.type}
                            onValueChange={(value: 'private' | 'shared') =>
                              updateRoom(room.id, 'type', value)
                            }
                          >
                            <SelectTrigger className="rounded-lg h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="shared">Shared</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <Badge
                        variant={room.type === 'private' ? 'default' : 'secondary'}
                        className="rounded-full text-xs"
                      >
                        {room.type === 'private' ? 'Private Room' : 'Shared Space'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="max-w-sm mx-auto">
              <div className="bg-white rounded-2xl border border-border p-4">
                <h4 className="text-sm mb-3">Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Home size={16} className="text-[var(--flare-green)]" />
                      <span className="text-xs text-muted-foreground">Private</span>
                    </div>
                    <p className="text-lg">
                      {detectedRooms.filter(r => r.type === 'private').length}
                    </p>
                  </div>
                  <div className="bg-muted rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={16} className="text-[var(--flare-brown)]" />
                      <span className="text-xs text-muted-foreground">Shared</span>
                    </div>
                    <p className="text-lg">
                      {detectedRooms.filter(r => r.type === 'shared').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {uploadedFile && isAnalyzed && (
        <div className="p-6 border-t border-border bg-white">
          <div className="max-w-sm mx-auto">
            <Button
              className="w-full rounded-xl"
              size="lg"
              onClick={handleConfirm}
            >
              <CheckCircle size={18} className="mr-2" />
              Confirm Layout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
