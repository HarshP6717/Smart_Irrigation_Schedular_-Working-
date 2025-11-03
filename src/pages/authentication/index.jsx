import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Authentication = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, register } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = t('errors.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errors.invalidEmail');
    }
    
    if (!formData.password) {
      newErrors.password = t('errors.required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('errors.minLength', { count: 6 });
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('errors.passwordMismatch');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        showSuccess(t('auth.welcomeBack'));
      } else {
        await register({
          email: formData.email,
          password: formData.password,
        });
        showSuccess(t('success.profileUpdated'));
      }
      
      navigate('/farms');
    } catch (error) {
      showError(error.message || t('errors.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-card border border-border rounded-xl p-6 card-shadow">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? t('auth.signInToAccount') : t('auth.joinSmartIrrigation')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder={t('auth.email')}
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                if (errors.email) setErrors({...errors, email: ''});
              }}
              error={errors.email}
              required
            />
            
            <Input
              type="password"
              placeholder={t('auth.password')}
              value={formData.password}
              onChange={(e) => {
                setFormData({...formData, password: e.target.value});
                if (errors.password) setErrors({...errors, password: ''});
              }}
              error={errors.password}
              required
            />

            {!isLogin && (
              <Input
                type="password"
                placeholder={t('auth.confirmPassword')}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({...formData, confirmPassword: e.target.value});
                  if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                }}
                error={errors.confirmPassword}
                required
              />
            )}

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? t('common.loading') : (isLogin ? t('auth.login') : t('auth.signup'))}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-primary hover:text-primary/80 text-sm"
            >
              {isLogin ? t('auth.noAccount') + ' ' + t('auth.signup') : t('auth.haveAccount') + ' ' + t('auth.login')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Authentication;