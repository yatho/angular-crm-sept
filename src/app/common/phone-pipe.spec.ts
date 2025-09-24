import { PhonePipe } from './phone-pipe';

describe('PhonePipe', () => {
  const pipe = new PhonePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('shoud have space between digit', () => {
    expect(pipe.transform('010203')).toBe('01 02 03');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle single digit', () => {
    expect(pipe.transform('0')).toBe('0');
  });

  it('should handle odd number of digits', () => {
    expect(pipe.transform('123')).toBe('12 3');
  });

  it('should handle long phone numbers', () => {
    expect(pipe.transform('0123456789')).toBe('01 23 45 67 89');
  });

  it('should trim spaces at the end', () => {
    expect(pipe.transform('1234')).toBe('12 34');
  });

  it('should handle non-numeric input gracefully', () => {
    expect(pipe.transform('ab12cd')).toBe('ab 12 cd');
  });
});
