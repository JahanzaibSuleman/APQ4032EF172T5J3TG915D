import { render, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

// Mock setTimeout and clearTimeout to control time in tests
jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const TestComponent = ({ value }: { value: string }) => {
      const debouncedValue = useDebounce(value, 300);
      return <div>{debouncedValue}</div>;
    };

    const { getByText } = render(<TestComponent value="initial" />);

    expect(getByText("initial")).toBeInTheDocument();
  });

  it("should update debounced value after delay", () => {
    const TestComponent = ({ value }: { value: string }) => {
      const debouncedValue = useDebounce(value, 300);
      return <div>{debouncedValue}</div>;
    };

    const { getByText, rerender } = render(<TestComponent value="initial" />);

    rerender(<TestComponent value="updated" />);

    // Expect debounced value to still be initial
    expect(getByText("initial")).toBeInTheDocument();

    // Fast forward time by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Expect debounced value to be updated
    expect(getByText("updated")).toBeInTheDocument();
  });
});
