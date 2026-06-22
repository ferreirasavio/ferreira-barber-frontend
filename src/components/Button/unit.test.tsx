import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./";

describe("Button unit test", () => {
  it("should render text button correctly", () => {
    render(<Button onClick={vi.fn()}>Clique aqui</Button>);

    const buttonElement = screen.getByRole("button", { name: /clique aqui/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call function onClick", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique</Button>);

    const buttonElement = screen.getByRole("button", { name: /clique/i });
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render disabled button", async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Clique
      </Button>,
    );

    const buttonElement = screen.getByRole("button", { name: /clique/i });
    await userEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should pass native attributes such as the button type.", () => {
    render(<Button type="submit">Salvar</Button>);

    const buttonEl = screen.getByRole("button", { name: /salvar/i });
    expect(buttonEl).toHaveAttribute("type", "submit");
  });
});
