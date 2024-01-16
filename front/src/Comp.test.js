import Comp from "./comp";
import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import {} from '@testing-library/react';


test("fetch data  from api", async () => {
          const mockAxios = jest.spyOn(axios, "get");
          mockAxios.mockResolvedValueOnce({
            data: {
              title: "Test Title",
              text: "Test Text",
            },
          });
      
          render(<Comp />);
      
          await waitFor(() => {
            expect(mockAxios).toHaveBeenCalledTimes(1);
      
            expect(screen.getByText("Test Title")).toBeInTheDocument();
            expect(screen.getByText("Test Text")).toBeInTheDocument();
          });
        });


        test("posts data to api", async () => {
                  const mockAxios = jest.spyOn(axios, "post");
                  mockAxios.mockResolvedValueOnce({});
              
                  render(<Comp />);
              
                  const input = screen.getByTestId("name-input");
                  const submitButton = screen.getByTestId("submit-button");
              
                  fireEvent.change(input, { target: { value: "ali alavi" } });
              
                  fireEvent.click(submitButton);
              
                  await waitFor(() => {
                    expect(mockAxios).toHaveBeenCalledTimes(1);
                    expect(mockAxios).toHaveBeenCalledWith("/api", { name: "ali alavi" });
                  });
                });

test("deletes data from api", async () => {
          const mockAxios = jest.spyOn(axios, "delete");
          mockAxios.mockResolvedValueOnce({});
      
          render(<Comp />);
      
          const deleteButton = screen.getByTestId("delete-button");
      
          fireEvent.click(deleteButton);
      
          await waitFor(() => {
            expect(mockAxios).toHaveBeenCalledTimes(1);
            expect(mockAxios).toHaveBeenCalledWith("/api");
          });
        });
      
              