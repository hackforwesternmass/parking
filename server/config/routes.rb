Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_scope :admin_user do
    match '' => 'active_admin/devise/sessions#new', via: :get
  end
end
