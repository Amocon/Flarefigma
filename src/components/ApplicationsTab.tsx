import { MessageCircle, CheckCircle, XCircle, Search, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChatCard } from './ChatCard';
import { ApplicationCard } from './ApplicationCard';
import { useState } from 'react';

interface ApplicationsTabProps {
  userRole: 'resident' | 'applicant';
}

export function ApplicationsTab({ userRole }: ApplicationsTabProps) {
  const [votedChats, setVotedChats] = useState<Set<string>>(new Set());

  // For resident view
  const residentChats = [
    {
      id: '1',
      name: 'Sarah Weber',
      photo: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU4Njk3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'That sounds great! When can we schedule a viewing?',
      time: '2h ago',
      unread: 2,
      status: 'voting' as const,
      votes: { yes: 2, no: 0, total: 3 }
    },
    {
      id: '2',
      name: 'Max Schmidt',
      photo: 'https://images.unsplash.com/photo-1611695434398-4f4b330623e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU2MTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'Thanks for considering my application!',
      time: '1d ago',
      unread: 0,
      status: 'pending' as const,
    },
  ];

  const acceptedChats = [
    {
      id: '3',
      name: 'Emma Fischer',
      photo: 'https://images.unsplash.com/photo-1714994632322-596ae9ba4bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNTQwNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'Looking forward to meeting everyone!',
      time: '3d ago',
      unread: 0,
      status: 'accepted' as const,
    },
  ];

  const declinedChats = [
    {
      id: '4',
      name: 'Lucas Bauer',
      photo: 'https://images.unsplash.com/photo-1611695434398-4f4b330623e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTU2MTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'Thanks for your time!',
      time: '1w ago',
      unread: 0,
      status: 'declined' as const,
    },
  ];

  // For applicant view (simpler)
  const applicantChats = [
    {
      id: '1',
      name: 'Kreuzberg WG',
      photo: 'https://images.unsplash.com/photo-1662454419622-a41092ecd245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MTU0NzYxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'We\'d love to meet you!',
      time: '1h ago',
      unread: 1,
      status: 'pending' as const,
    },
  ];

  const handleVote = (chatId: string, vote: 'invite' | 'decline') => {
    console.log('Vote:', vote, 'for chat:', chatId);
    setVotedChats(prev => new Set(prev).add(chatId));
  };

  if (userRole === 'applicant') {
    const applicantApplications = {
      pending: [
        {
          id: '1',
          wgName: 'Cozy Kreuzberg WG',
          district: 'Kreuzberg',
          photo: 'https://images.unsplash.com/photo-1662454419622-a41092ecd245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MTU0NzYxNHww&ixlib=rb-4.1.0&q=80&w=1080',
          lastMessage: 'Thanks for your interest! We\'ll review your application.',
          time: '2h ago',
          unread: 1,
          status: 'pending' as const,
        },
        {
          id: '2',
          wgName: 'Bright Mitte Apartment',
          district: 'Mitte',
          photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1Mjc1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          lastMessage: 'Your profile looks great!',
          time: '1d ago',
          unread: 0,
          status: 'pending' as const,
        },
      ],
      invited: [
        {
          id: '3',
          wgName: 'Friedrichshain Family',
          district: 'Friedrichshain',
          photo: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjE1Mjc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          lastMessage: 'We\'d love to meet you! 🎉',
          time: '3h ago',
          unread: 2,
          status: 'invited' as const,
        },
      ],
      meetingScheduled: [
        {
          id: '4',
          wgName: 'Prenzlauer WG',
          district: 'Prenzlauer Berg',
          photo: 'https://images.unsplash.com/photo-1616418928117-4e6d19be2df1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTU5MTE2NXww&ixlib=rb-4.1.0&q=80&w=1080',
          lastMessage: 'See you on Saturday!',
          time: '2d ago',
          unread: 0,
          status: 'meeting-scheduled' as const,
          meetingDate: 'Saturday, Nov 2 at 3:00 PM',
        },
      ],
      declined: [
        {
          id: '5',
          wgName: 'Charlottenburg Flat',
          district: 'Charlottenburg',
          photo: 'https://images.unsplash.com/photo-1593853761096-d0423b545cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBraXRjaGVuJTIwYXBhcnRtZW50fGVufDF8fHx8MTc2MTU5NTc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
          lastMessage: 'Thanks for your interest.',
          time: '5d ago',
          unread: 0,
          status: 'declined' as const,
        },
      ],
    };

    return (
      <div className="pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6 rounded-b-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <MessageCircle size={24} />
            </div>
            <h1 className="text-white">My Applications</h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              placeholder="Search applications..." 
              className="pl-12 h-12 rounded-2xl bg-white border-0"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 mt-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6 bg-muted rounded-2xl p-1">
              <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="rounded-xl data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white">
                Pending ({applicantApplications.pending.length})
              </TabsTrigger>
              <TabsTrigger value="invited" className="rounded-xl data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white">
                Invited ({applicantApplications.invited.length})
              </TabsTrigger>
              <TabsTrigger value="archived" className="rounded-xl data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white">
                Archived
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {/* Invited (Priority) */}
              {applicantApplications.invited.length > 0 && (
                <>
                  {applicantApplications.invited.map((app) => (
                    <ApplicationCard key={app.id} {...app} />
                  ))}
                </>
              )}
              
              {/* Meeting Scheduled */}
              {applicantApplications.meetingScheduled.length > 0 && (
                <>
                  {applicantApplications.meetingScheduled.map((app) => (
                    <ApplicationCard key={app.id} {...app} />
                  ))}
                </>
              )}
              
              {/* Pending */}
              {applicantApplications.pending.length > 0 && (
                <>
                  {applicantApplications.pending.map((app) => (
                    <ApplicationCard key={app.id} {...app} />
                  ))}
                </>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-3">
              {applicantApplications.pending.length > 0 ? (
                applicantApplications.pending.map((app) => (
                  <ApplicationCard key={app.id} {...app} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Clock size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="mb-2">No pending applications</h3>
                  <p className="text-sm text-muted-foreground">
                    Start swiping to apply for WGs
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="invited" className="space-y-3">
              {applicantApplications.invited.length > 0 || applicantApplications.meetingScheduled.length > 0 ? (
                <>
                  {applicantApplications.invited.map((app) => (
                    <ApplicationCard key={app.id} {...app} />
                  ))}
                  {applicantApplications.meetingScheduled.map((app) => (
                    <ApplicationCard key={app.id} {...app} />
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="mb-2">No invitations yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep applying! Invitations will appear here
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="archived" className="space-y-3">
              {applicantApplications.declined.length > 0 ? (
                applicantApplications.declined.map((app) => (
                  <ApplicationCard key={app.id} {...app} />
                ))
              ) : (
                <div className="text-center py-12">
                  <XCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="mb-2">No archived applications</h3>
                  <p className="text-sm text-muted-foreground">
                    Declined applications will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Resident view with tabs
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--flare-green)] to-[var(--flare-green-dark)] text-white px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <MessageCircle size={24} />
          </div>
          <h1 className="text-white">Applicants & Chats</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input 
            placeholder="Search chats..." 
            className="pl-12 h-12 rounded-2xl bg-white border-0"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 bg-muted rounded-2xl p-1">
            <TabsTrigger value="active" className="rounded-xl data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white">
              Active ({residentChats.length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="rounded-xl data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white">
              Accepted ({acceptedChats.length})
            </TabsTrigger>
            <TabsTrigger value="archived" className="rounded-xl data-[state=active]:bg-[var(--flare-green)] data-[state=active]:text-white">
              Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3">
            {residentChats.length > 0 ? (
              residentChats.map((chat) => (
                <ChatCard 
                  key={chat.id} 
                  {...chat}
                  onVoteInvite={() => handleVote(chat.id, 'invite')}
                  onVoteDecline={() => handleVote(chat.id, 'decline')}
                  userVoted={votedChats.has(chat.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">No active chats</h3>
                <p className="text-sm text-muted-foreground">
                  New applicants will appear here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-3">
            {acceptedChats.length > 0 ? (
              acceptedChats.map((chat) => (
                <ChatCard key={chat.id} {...chat} />
              ))
            ) : (
              <div className="text-center py-12">
                <CheckCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">No accepted applicants</h3>
                <p className="text-sm text-muted-foreground">
                  Accepted applicants will appear here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="archived" className="space-y-3">
            {declinedChats.length > 0 ? (
              declinedChats.map((chat) => (
                <ChatCard key={chat.id} {...chat} />
              ))
            ) : (
              <div className="text-center py-12">
                <XCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">No archived chats</h3>
                <p className="text-sm text-muted-foreground">
                  Declined or archived chats will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
