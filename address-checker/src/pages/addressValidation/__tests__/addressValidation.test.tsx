import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { validateAddress } from '../../../helpers/validateAddress/validateAddress';
import { AddressValidation } from '../addressValidation';

jest.mock('../../../helpers/validateAddress/validateAddress');

const mockedValidateAddress = validateAddress as jest.MockedFunction<
  typeof validateAddress
>;

describe('AddressValidation component', () => {
  beforeEach(() => {
    mockedValidateAddress.mockReset();
  });

  it('Valid street search', async () => {
    mockedValidateAddress.mockResolvedValue({
      streetName: 'Akersgata',
      streetNumber: '55',
      entrance: '',
      valid: true,
      message: 'Valid address: Akersgata 55',
    });

    render(<AddressValidation />);

    const streetInput = screen.getByLabelText('Street name 1');
    const numberInput = screen.getByLabelText('Street number');
    const entranceInput = screen.getByLabelText('Entrance');

    await userEvent.type(streetInput, 'Akersgata');
    await userEvent.type(numberInput, '55');
    await userEvent.type(entranceInput, '');

    const validateButton = screen.getByRole('button', {
      name: 'Validate address',
    });

    await userEvent.click(validateButton);
    const alert = await screen.findByText('Valid address: Akersgata 55');
    expect(alert).toBeInTheDocument();
  });

  it('Invalid street search', async () => {
    mockedValidateAddress.mockResolvedValue({
      streetName: 'Akersgataaaa',
      streetNumber: '55',
      entrance: '',
      valid: false,
      message: 'Street name not valid: Akersgataaaa 55',
    });

    render(<AddressValidation />);

    const streetInput = screen.getByLabelText('Street name 1');
    const numberInput = screen.getByLabelText('Street number');
    const entranceInput = screen.getByLabelText('Entrance');

    await userEvent.type(streetInput, 'Akersgataaaa');
    await userEvent.type(numberInput, '55');
    await userEvent.type(entranceInput, '');

    const validateButton = screen.getByRole('button', {
      name: 'Validate address',
    });

    await userEvent.click(validateButton);
    const alert = await screen.findByText(
      'Street name not valid: Akersgataaaa 55'
    );
    expect(alert).toBeInTheDocument();
  });

  it('Invalid street number', async () => {
    mockedValidateAddress.mockResolvedValue({
      streetName: 'Akersgata',
      streetNumber: '55555',
      entrance: '',
      valid: false,
      message: 'Address not found: Akersgata 55555',
    });

    render(<AddressValidation />);

    const streetInput = screen.getByLabelText('Street name 1');
    const numberInput = screen.getByLabelText('Street number');
    const entranceInput = screen.getByLabelText('Entrance');

    await userEvent.type(streetInput, 'Akersgata');
    await userEvent.type(numberInput, '55555');
    await userEvent.type(entranceInput, '');

    const validateButton = screen.getByRole('button', {
      name: 'Validate address',
    });

    await userEvent.click(validateButton);
    const alert = await screen.findByText('Address not found: Akersgata 55555');
    expect(alert).toBeInTheDocument();
  });

  it('Validate two addresses', async () => {
    mockedValidateAddress
      .mockResolvedValueOnce({
        streetName: 'Akersgata',
        streetNumber: '55',
        entrance: '',
        valid: true,
        message: 'Valid address: Akersgata 55',
      })
      .mockResolvedValueOnce({
        streetName: 'Karl Johans gate',
        streetNumber: '12',
        entrance: 'B',
        valid: true,
        message: 'Valid address: Karl Johans gate 12B',
      });

    render(<AddressValidation />);

    await userEvent.click(
      screen.getByRole('button', { name: 'New address field' })
    );

    const streetInputs = screen.getAllByLabelText(/street name/i);
    const numberInputs = screen.getAllByLabelText(/street number/i);
    const entranceInputs = screen.getAllByLabelText(/entrance/i);

    await userEvent.type(streetInputs[0], 'Akersgata');
    await userEvent.type(numberInputs[0], '55');
    await userEvent.type(entranceInputs[0], '');

    await userEvent.type(streetInputs[1], 'Karl Johans gate');
    await userEvent.type(numberInputs[1], '12');
    await userEvent.type(entranceInputs[1], 'B');

    await userEvent.click(
      screen.getByRole('button', { name: 'Validate address' })
    );

    const alerts = await screen.findAllByRole('alert');
    expect(alerts[0]).toHaveTextContent('Valid address: Akersgata 55');
    expect(alerts[1]).toHaveTextContent('Valid address: Karl Johans gate 12B');
  });

  it('adding and removing address fields', async () => {
    render(<AddressValidation />);
    const addButton = screen.getByRole('button', { name: 'New address field' });

    await userEvent.click(addButton);
    const inputs = screen.getAllByLabelText(/Street name/i);
    expect(inputs).toHaveLength(2);

    const removeButtons = screen.getAllByLabelText('remove address field');
    await userEvent.click(removeButtons[1]);

    const updatedInputs = screen.getAllByLabelText(/Street name/i);
    expect(updatedInputs).toHaveLength(1);
  });
});
