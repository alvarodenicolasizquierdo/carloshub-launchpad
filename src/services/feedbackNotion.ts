import { supabase } from '@/integrations/supabase/client';

interface FeedbackPayload {
  title: string;
  type: string;
  description: string;
  module: string;
  priority: string;
  submittedBy: string;
  organisation: string;
  email: string;
  submittedAt: string;
  source: string;
}

const NOTION_DATABASE_ID = 'c7653429998045ad82dff27f03284704';

export async function sendFeedbackToNotion(payload: FeedbackPayload): Promise<boolean> {
  const notionBody = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      'Title': {
        title: [{ text: { content: payload.title || 'Untitled' } }],
      },
      'Type': {
        select: { name: payload.type || '💡 Idea' },
      },
      'Description': {
        rich_text: [{ text: { content: (payload.description || '').slice(0, 2000) } }],
      },
      'Module': {
        select: { name: payload.module || 'Other' },
      },
      'Priority': {
        select: { name: payload.priority || 'Medium' },
      },
      'Submitted By': {
        rich_text: [{ text: { content: payload.submittedBy || 'Anonymous' } }],
      },
      'Organisation': {
        rich_text: [{ text: { content: payload.organisation || '' } }],
      },
      'Email': {
        email: payload.email || null,
      },
      'Status': {
        select: { name: 'New' },
      },
      'Upvotes': {
        number: 0,
      },
    },
  };

  try {
    const { data, error } = await supabase.functions.invoke('notion-proxy', {
      body: {
        endpoint: 'pages',
        method: 'POST',
        body: notionBody,
      },
    });

    if (error) {
      console.error('[Feedback] Edge function error:', error);
      return false;
    }

    if (data?.object === 'error') {
      console.warn('[Feedback] Notion API error:', data.message);
      return false;
    }

    console.log('[Feedback] Successfully synced to Notion via edge function.');
    return true;
  } catch (error) {
    console.error('[Feedback] Failed to sync to Notion:', error);
    return false;
  }
}
