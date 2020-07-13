class ToastService {
  displaySuccessMessage(context, title, body) {
    context.toast(body, {
      title,
      toaster: "b-toaster-top-center",
      variant: "success",
      solid: true,
    });
  }

  displayErrorMessage(context, title, body) {
    context.toast(body, {
      title,
      toaster: "b-toaster-top-center",
      variant: "danger",
      solid: true,
    });
  }
}

export default new ToastService();
