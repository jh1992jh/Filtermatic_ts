import { IFilter } from "./filters/filters";

export class Filters {
  constructor(
    public filters: IFilter[],
    public selectedFilter: IFilter,
    public ctx: any
  ) {}

  setupFilterMenu = (): void => {
    const menu = document.querySelector<HTMLElement>(".filter_menu");

    if (menu) {
      this.filters.forEach((filter: IFilter) => {
        menu.innerHTML += `
        <div class="menu_item menu_filter" id="${
          filter.title
        }" style="background: rgba(${filter.r + 100}, ${filter.g +
          100}, ${filter.b + 100}, 0.5)">
          <span id="${filter.title}">${filter.title}</span>
        </div>
        `;
      });
    }

    const menu_filters = document.querySelectorAll(".menu_filter");

    menu_filters.forEach(filter => {
      return filter.addEventListener("click", (e: Event) =>
        this.selectFilter(e)
      );
    });
  };

  selectFilter = (e: Event) => {
    const filterTitle = (e.target as HTMLElement).id;

    const filter = this.filters.filter(
      (filter: IFilter) => filter.title === filterTitle
    );

    this.selectedFilter = filter[0];
  };

  addFilter = () => {
    let pixels = this.ctx.getImageData(0, 0, 500, 500);

    const { r, g, b } = this.selectedFilter;

    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + r; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + g; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] + b; // Blue
    }

    this.ctx.putImageData(pixels, 0, 0);
  };
}
