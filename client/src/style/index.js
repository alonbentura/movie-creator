import styled from "styled-components";

export const Title = styled.h1.attrs({
  className: "h1",
})``;

export const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

export const Label = styled.label`
  margin: 5px;
`;

export const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 5px;
`;

export const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

export const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;
export const ListWrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

export const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

export const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;
