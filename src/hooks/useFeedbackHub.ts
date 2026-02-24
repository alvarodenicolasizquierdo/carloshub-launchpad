import { create } from 'zustand';

export type SubmissionType = 'idea' | 'question' | 'request' | 'issue';
export type SubmissionStatus = 'new' | 'under_review' | 'planned' | 'resolved';
export type SubmissionPriority = 'low' | 'medium' | 'high';

export interface FeedbackSubmission {
  id: string;
  type: SubmissionType;
  title: string;
  description: string;
  module: string;
  submittedBy: string;
  organisation: string;
  email: string;
  status: SubmissionStatus;
  priority: SubmissionPriority;
  upvotes: number;
  hasUpvoted: boolean;
  createdAt: Date;
  response?: string;
}

interface FeedbackHubState {
  submissions: FeedbackSubmission[];
  recentSubmissionEmail: string | null;
  recentSubmissionType: SubmissionType | null;
  clearRecentSubmission: () => void;
  addSubmission: (submission: Omit<FeedbackSubmission, 'id' | 'status' | 'upvotes' | 'hasUpvoted' | 'createdAt' | 'response'>) => void;
  upvoteSubmission: (id: string) => void;
}

const SEED_SUBMISSIONS: FeedbackSubmission[] = [
  {
    id: 'fb-001',
    type: 'idea',
    title: 'Bulk upload for test report submissions',
    description: 'When we have 50+ styles in a season drop, submitting TRFs one by one is painful. A CSV or Excel bulk upload with validation would save hours per week.',
    module: 'Test Requests',
    submittedBy: 'Sarah Chen',
    organisation: 'Retailer – Quality Team',
    email: 'sarah.chen@example.com',
    status: 'planned',
    priority: 'high',
    upvotes: 12,
    hasUpvoted: false,
    createdAt: new Date('2026-01-28'),
    response: 'Great suggestion — this is on the Q2 roadmap. We are designing the template now and will share for feedback before build.',
  },
  {
    id: 'fb-002',
    type: 'question',
    title: 'How does the AI risk score get calculated?',
    description: 'I can see the risk score on the supplier dashboard but I want to understand the weighting. Is it based on historical fail rates only, or does it include external data?',
    module: 'Supplier Management',
    submittedBy: 'James Okafor',
    organisation: 'Brand – Compliance',
    email: 'j.okafor@example.com',
    status: 'resolved',
    priority: 'medium',
    upvotes: 8,
    hasUpvoted: false,
    createdAt: new Date('2026-02-01'),
    response: 'The AI risk score uses a weighted composite: 40% historical test fail rate, 25% audit findings severity, 20% corrective action response time, and 15% regulatory exposure. Full methodology is in the Knowledge Hub under "AI Transparency".',
  },
  {
    id: 'fb-003',
    type: 'request',
    title: 'Add bluesign® filter to the compliance dashboard',
    description: 'We need to filter the compliance view by certification scheme — specifically bluesign® — so we can generate reports for our sustainability team without manual cross-referencing.',
    module: 'Sustainability',
    submittedBy: 'Lena Müller',
    organisation: 'SGS – Sustainability Services',
    email: 'lena.mueller@example.com',
    status: 'under_review',
    priority: 'high',
    upvotes: 15,
    hasUpvoted: false,
    createdAt: new Date('2026-02-05'),
  },
  {
    id: 'fb-004',
    type: 'issue',
    title: 'PDF export cuts off the last column on inspection reports',
    description: 'When exporting an inspection report to PDF in landscape mode, the rightmost column (Overall Result) is truncated. This happens on Chrome and Edge. Firefox works fine.',
    module: 'Inspections',
    submittedBy: 'Marcus Wong',
    organisation: 'Supplier – Factory QA',
    email: 'marcus.w@example.com',
    status: 'under_review',
    priority: 'medium',
    upvotes: 4,
    hasUpvoted: false,
    createdAt: new Date('2026-02-07'),
  },
];

export const useFeedbackHub = create<FeedbackHubState>((set) => ({
  submissions: SEED_SUBMISSIONS,
  recentSubmissionEmail: null,
  recentSubmissionType: null,
  clearRecentSubmission: () => set({ recentSubmissionEmail: null, recentSubmissionType: null }),
  addSubmission: (submission) =>
    set((state) => ({
      recentSubmissionEmail: submission.email,
      recentSubmissionType: submission.type,
      submissions: [
        {
          ...submission,
          id: `fb-${String(state.submissions.length + 1).padStart(3, '0')}`,
          status: 'new' as SubmissionStatus,
          upvotes: 0,
          hasUpvoted: false,
          createdAt: new Date(),
        },
        ...state.submissions,
      ],
    })),
  upvoteSubmission: (id) =>
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === id && !s.hasUpvoted
          ? { ...s, upvotes: s.upvotes + 1, hasUpvoted: true }
          : s
      ),
    })),
}));
