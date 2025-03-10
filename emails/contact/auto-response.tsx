import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AutoResponseEmailProps {
  name: string;
}

export const AutoResponseEmail = ({ name }: AutoResponseEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for contacting Ronny Badilla</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Thank you for your message, {name}!</Heading>
          <Section>
            <Text style={text}>
              I've received your contact form submission and will get back to you as soon as possible.
            </Text>
            <Text style={text}>
              If your request is urgent, please feel free to connect with me on LinkedIn or check out my other profiles below.
            </Text>
          </Section>
          <Hr style={hr} />
          <Section style={socialSection}>
            <Text style={socialText}>Connect with me</Text>
            <Button
              href="https://linkedin.com/in/rbadillap"
              style={{
                ...socialLink,
                backgroundColor: '#0A66C2',
              }}
            >
              LinkedIn
            </Button>
            <Button
              href="https://github.com/rbadillap"
              style={{
                ...socialLink,
                backgroundColor: '#24292e',
              }}
            >
              GitHub
            </Button>
            <Button
              href="https://x.com/rbadillap"
              style={{
                ...socialLink,
                backgroundColor: '#000000',
              }}
            >
              Twitter
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            &copy; {new Date().getFullYear()} Ronny Badilla. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '24px',
  borderRadius: '4px',
  maxWidth: '600px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const text = {
  margin: '24px 0',
  fontSize: '16px',
  lineHeight: '1.4',
  color: '#484848',
};

const socialSection = {
  margin: '28px 0',
  textAlign: 'center' as const,
};

const socialText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#484848',
  marginBottom: '14px',
};

const socialLink = {
  margin: '0 8px',
  padding: '8px 16px',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  fontSize: '14px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginTop: '20px',
  textAlign: 'center' as const,
};

export default AutoResponseEmail; 