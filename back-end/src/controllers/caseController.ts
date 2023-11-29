import { getAllCases, createOne, updateCase, deleteCase } from "../modals/cases";
import { success, failed } from "../utility/responseArr";
import { FailedResponse, SuccessResponse } from "../utility/interfaces";
import { generateFxFileId, validateFields } from "../utility/utility";

export const get = async (): Promise<SuccessResponse | FailedResponse> => {
  try {
    const annualCost = await getAllCases();
    const message = "All cases have been fetched successfully";

    return success(message, annualCost);
  } catch (error) {
    console.error(error);
    const errorMessage = "An error occurred while creating a Cases";

    return failed(errorMessage);
  }
};

export const post = async (customerName: string, startDate: Date, isFinished: boolean): Promise<SuccessResponse | FailedResponse> => {
  try {
    const validationError = validateFields(customerName, startDate, isFinished);

    if (validationError)
      return failed(validationError);

    const fxFileId = generateFxFileId(customerName);
    const annualCost = await createOne(customerName, startDate, isFinished, fxFileId);
    const message = "Case has been created successfully";

    return success(message, annualCost);
  }
  catch (error) {
    console.error(error);
    const errorMessage = "An error occurred while creating a Case";

    return failed(errorMessage);
  }
};

export const update = async (id: number, customerName: string, startDate: Date, isFinished: boolean): Promise<SuccessResponse | FailedResponse> => {
  try {
    const validationError = validateFields(customerName, startDate, isFinished);

    if (validationError)
      return failed(validationError);

    const fxFileId = generateFxFileId(customerName);
    const annualCost = await updateCase(id, customerName, startDate, isFinished, fxFileId);
    const message = "Case has been updated successfully";

    return success(message, annualCost);
  } catch (error) {
    console.error(error);
    const errorMessage = "An error occurred while updated a Case";

    return failed(errorMessage);
  }
};

export const remove = async (id: number): Promise<SuccessResponse | FailedResponse> => {
  try {
    const annualCost = await deleteCase(id);
    const message = "Case has been deleted successfully";

    return success(message, annualCost);
  } catch (error) {
    console.error(error);
    const errorMessage = "An error occurred while deleting a Case";

    return failed(errorMessage);
  }
};


