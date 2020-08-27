export default function(initialState: any) {
  console.log(initialState);
  return { isLogin: initialState?.data?.is_valid };
}
