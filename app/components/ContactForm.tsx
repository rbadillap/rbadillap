'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>({
    status: 'idle',
    message: ''
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        status: 'error',
        message: 'Please fill out all fields'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        status: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    try {
      setFormStatus({ status: 'submitting', message: 'Sending your message...' });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success! Clear the form
      setFormData({ name: '', email: '', message: '' });
      setFormStatus({
        status: 'success',
        message: 'Thanks for your message! I\'ll get back to you soon.'
      });
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message'
      });
    }
  };

  const isSubmitting = formStatus.status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your name"
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={formStatus.status === 'error' && !formData.name ? 'true' : 'false'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your.email@example.com"
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={formStatus.status === 'error' && !formData.email ? 'true' : 'false'}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your message here..."
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={formStatus.status === 'error' && !formData.message ? 'true' : 'false'}
        />
      </div>

      {formStatus.message && (
        <div
          className={`p-3 rounded-md ${
            formStatus.status === 'error'
              ? 'bg-red-900/50 text-red-200'
              : formStatus.status === 'success'
              ? 'bg-green-900/50 text-green-200'
              : 'bg-blue-900/50 text-blue-200'
          }`}
          role="alert"
          aria-live="polite"
        >
          {formStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <div className="pt-2">
        <p className="text-xs text-neutral-400">
          Your information is protected and will only be used to respond to your inquiry.
        </p>
      </div>
    </form>
  );
} 