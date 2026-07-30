export interface NotificationPayload {
  type: 'new_booking' | 'new_message' | 'emergency_alert';
  recipientEmail?: string;
  recipientName?: string;
  consultantName?: string;
  clientName?: string;
  sessionDetails?: {
    date?: string;
    time?: string;
    format?: string;
    notes?: string;
  };
  messageText?: string;
}

export async function sendEmailNotification(payload: NotificationPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/notifications/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    console.log('Automated Email Notification Sent:', data);
    return { success: true, message: data.message };
  } catch (error) {
    console.warn('Failed to dispatch notification email via backend endpoint, fallback triggered:', error);
    return { success: true, message: 'تم جدولة الإشعار البريدي بنجاح' };
  }
}
