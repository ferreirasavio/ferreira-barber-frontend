import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Input from "./";

describe("Input unit test", () => {
  it("should render input label", () => {
    render(<Input title="Escreva seu nome" />);

    const inputElement = screen.getByText(/escreva seu nome/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should render a placeholder", () => {
    render(<Input placeholder="exemplo@gmail.com" />);

    const inputElement = screen.getByPlaceholderText(/exemplo@gmail.com/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should input with email mask", () => {
    render(<Input type="email" placeholder="Digite seu e-mail" />);

    const inputElement = screen.getByPlaceholderText(/digite seu e-mail/i);

    expect(inputElement).toHaveAttribute("type", "email");
  });

  it("should render input select type", () => {
    const mockList = ["exemple1", "exemple2", "exemple3"];
    render(<Input inputType="select" listOptions={mockList} />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    expect(options[0]).toHaveTextContent("exemple1");
  });

  it("should allow selecting an option", async () => {
    const mockList = ["exemple1", "exemple2", "exemple3"];
    render(<Input inputType="select" listOptions={mockList} />);

    const selectElement = screen.getByRole("combobox");

    await userEvent.selectOptions(selectElement, "exemple2");

    expect(selectElement).toHaveValue("exemple2");
  });

  it("should render input password type", async () => {
    render(<Input type="password" placeholder="Sua Senha" />);

    const inputElement = screen.getByPlaceholderText(/sua senha/i);

    expect(inputElement).toHaveAttribute("type", "password");

    await userEvent.type(inputElement, "123456");

    expect(inputElement).toHaveValue("123456");
  });

  it("should toggle password visibility when clicking the eye button", async () => {
    render(<Input type="password" placeholder="Sua Senha" />);

    const inputElement = screen.getByPlaceholderText(/sua senha/i);
    expect(inputElement).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button");

    await userEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
