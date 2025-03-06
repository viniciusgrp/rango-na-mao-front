import { setUser } from "@/reducers/user.reducer";
import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";

export default function Page() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const [nome, setNome] = useState("");

  return (
    <div>
      
    </div>
  );
}
