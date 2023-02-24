import React from "react";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
  bgcolor,
} from "@pankod/refine-mui";
import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";
const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  propertyImage,
  formLoading,
  onFinish,
  onFinishHandler,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a property
      </Typography>

      <Box mt={2.5} borderRadius="15px" bgcolor="#fcfcfc" padding={"20px"}>
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText>
              Enter property name:
              <TextField/>
            </FormHelperText>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Form;
