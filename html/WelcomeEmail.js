const { Html, Head, Body, Container, Heading, Text } = require('@react-email/components');

const WelcomeEmail = ({ name }) => (
    <Html>
        <Head />
        <Body>
            <Container>
                <Heading>Welcome to Our Newsletter, {name}!</Heading>
                <Text>Thank you for subscribing to our newsletter. We’re excited to have you on board!</Text>
            </Container>
        </Body>
    </Html>
);

module.exports = WelcomeEmail;
