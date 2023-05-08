exports.forgotPassword = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('forgotPassword', {
      title: 'Redefinir Senha',
      errors: errors.array(),
      resetToken: req.params.resetToken,
    });
  }

  // Find user with provided reset token
  const { resetToken } = req.params;
  const user = await User.findOne({
    where: {
      forgotPasswordToken: resetToken,
      forgotPasswordExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    return res.status(401).render('forgotPassword', {
      title: 'Redefinir Senha',
      message: 'O token de redefinição de senha é inválido ou expirou.',
      resetToken,
    });
  }

  // Hash new password
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update user password and reset token fields in database
  user.password = hashedPassword;
  user.forgotPasswordToken = null;
  user.forgotPasswordExpires = null;
  await user.save();

  res.render('forgotPassword', {
    title: 'Redefinir Senha',
    message: 'Senha alterada com sucesso!',
  });
};
