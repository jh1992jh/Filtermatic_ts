export class ToolMenu {
  showToolMenu: string | null = null;
  paintTool: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#paint_tool");
  textTool: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#text_tool");
  infoTool: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#info_tool");
  paintToolMenu: HTMLDivElement | null = document.querySelector<HTMLDivElement>(
    "#paint_tool_menu"
  );
  textToolMenu: HTMLDivElement | null = document.querySelector<HTMLDivElement>(
    "#text_tool_menu"
  );
  infoToolMenu: HTMLDivElement | null = document.querySelector<HTMLDivElement>(
    "#info_tool_menu"
  );

  addListeners = (): void => {
    this.paintTool &&
      this.paintTool.addEventListener("click", (e: Event) =>
        this.toggleToolMenu(e)
      );

    this.textTool &&
      this.textTool.addEventListener("click", (e: Event) => {
        this.toggleToolMenu(e);
      });

    this.infoTool &&
      this.infoTool.addEventListener("click", (e: Event) => {
        this.toggleToolMenu(e);
      });
    const closeBtns = document.querySelectorAll(".close_toolmenu");

    closeBtns.forEach(button => {
      button.addEventListener(
        "click",
        (e: any) => (e.target.parentElement.style.display = "none")
      );
    });
  };

  toggleToolMenu = (e: any): void => {
    if (
      e.target &&
      e.target.id === "paint_tool" &&
      this.paintToolMenu &&
      this.textToolMenu &&
      this.infoToolMenu
    ) {
      this.textToolMenu.style.display = "none";
      this.infoToolMenu.style.display = "none";
      this.paintToolMenu.style.display = "flex";
    } else if (
      e.target.id === "text_tool" &&
      this.paintToolMenu &&
      this.textToolMenu &&
      this.infoToolMenu
    ) {
      this.paintToolMenu.style.display = "none";
      this.infoToolMenu.style.display = "none";
      this.textToolMenu.style.display = "flex";
    } else if (
      e.target &&
      e.target.id === "info_tool" &&
      this.paintToolMenu &&
      this.textToolMenu &&
      this.infoToolMenu
    ) {
      this.paintToolMenu.style.display = "none";
      this.textToolMenu.style.display = "none";
      this.infoToolMenu.style.display = "flex";
    }
  };
}
