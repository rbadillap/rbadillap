import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>
          <Section style={section}>
            <Row>
              <Column>
                <Text style={labelText}>Name:</Text>
              </Column>
              <Column>
                <Text style={valueText}>{name}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={labelText}>Email:</Text>
              </Column>
              <Column>
                <Text style={valueText}>{email}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={labelText}>Message:</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={messageText}>{message}</Text>
              </Column>
            </Row>
          </Section>
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

const section = {
  padding: '21px 0 14px',
};

const labelText = {
  margin: '0 0 4px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#484848',
};

const valueText = {
  margin: '0 0 10px',
  fontSize: '14px',
  color: '#484848',
};

const messageText = {
  margin: '0 0 10px',
  fontSize: '14px',
  color: '#484848',
  whiteSpace: 'pre-wrap',
  lineHeight: '1.5',
  padding: '8px 0',
};

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginTop: '20px',
  textAlign: 'center' as const,
};

export default ContactFormEmail; 