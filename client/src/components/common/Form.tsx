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
  Input,
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
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter property name:
              <TextField
                fullWidth
                required
                id="outline-basic"
                color="info"
                variant="outlined"
                {...register("title", { required: true })}
              />
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Property description:
              <TextareaAutosize
                minRows={5}
                required
                placeholder="Write here"
                color="info"
                style={{
                  width: "100%",
                  fontSize: "16px",
                  borderColor: "rgba(0,0,0,23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("description", { required: true })}
              />
            </FormHelperText>
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select property types:{" "}
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{
                  "aria-label": "Without label",
                }}
                defaultValue="apartment"
                {...register("propertyType", { required: true })}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Enter property price:
                <TextField
                  fullWidth
                  required
                  id="outline-basic"
                  color="info"
                  type={"number"}
                  variant="outlined"
                  {...register("price", { required: true })}
                />
              </FormHelperText>
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter location:
              <TextField
                fullWidth
                required
                id="outline-basic"
                color="info"
                variant="outlined"
                {...register("location", { required: true })}
              />
            </FormHelperText>
          </FormControl>
          <Stack direction={"column"} gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type={"file"}
                  onChange={(e) => {
                    //@ts-ignore
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton 
            type="submit"
            title={formLoading ? "Submitting": "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
