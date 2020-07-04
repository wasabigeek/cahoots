// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {EditableQuestion} from '../EditableQuestion';


describe('when question is empty object', () => {
  beforeEach(() => {
    render(<EditableQuestion question={{}} />);
  });

  it('renders textarea for question text', () => {
    expect(screen.getByPlaceholderText('Question text')).toBeTruthy();
  });

  it('user can select a correct answer', () => {
    const correctAnswerDropdown = screen.getByLabelText('Correct Answer');
    expect(correctAnswerDropdown).toBeTruthy();

    fireEvent.change(screen.getByTestId('correctAnswerDropdown'), { target: { value: 'C' } });

    const selected = screen.getByDisplayValue('C', { selector: '#correctAnswerDropdown' });
    expect(selected).toBeTruthy();
  });
});
