import ms from "ms";

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const expiresIn = process.env.JWT_EXPIRES_IN || "5d";

  const expirationTime = new Date(Date.now() + ms(expiresIn));

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: expirationTime,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
