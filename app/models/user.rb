class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :email
  has_many :jobs, dependent: :destroy

  def self.find_from_credentials(email, password)
    user = self.find_by(email: email)
    return nil unless user
    user if user.is_password?(password)
  end

  def is_password?(password_attempt)
    BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end
end
