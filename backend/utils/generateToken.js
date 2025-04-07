import jwt from 'jsonwebtoken';

export const generateToken = (req, res, userId) => {
  try {
    // Determine token expiration based on "remember me" option
    const isRemembered = req.body.remember || false;
    const expiresIn = isRemembered ? '365d' : '24h'; // 365 days or 24 hours
    const maxAge = isRemembered
      ? 365 * 24 * 60 * 60 * 1000 // 365 days in milliseconds
      : 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn,
    });

    // Set the JWT as an HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'None', // Required for cross-origin cookies
      maxAge,
    });
  } catch (error) {
    console.error('Error generating token:', error.message);
    res.status(500).json({ message: 'Failed to generate token' });
  }
};
