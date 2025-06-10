export interface IFormInputs {
  city: string;
  remember: boolean;
}

// Типизация пропсов для компонента Form
export interface FormProps {
  onFormSubmit: (data: { city: string }) => void;
}