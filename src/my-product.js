import { LitElement, css, html } from "lit";
import { Task } from "@lit/task";
import { property } from "lit/decorators.js";

export class MyProduct extends LitElement {
  _productsTask = new Task(this, {
    task: async () => {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    },
    args: () => [this.products],
  });

  render() {
    return this._productsTask.render({
      pending: () => html`<p>loading products...</p>`,
      complete: (products) => {
        console.log(products);
        return html`
          <section>
            ${products.map(
              (product) => html`
                <div class="card">
                  <p class="product-name">Product Name: ${product.title}</p>
                  <p>Product Category: ${product.category.name}</p>
                  <span>Product Price: ${product.price}</span>
                </div>
              `
            )}
          </section>
        `;
      },
    });
  }

  static get styles() {
    return css`
      section {
        display: flex;
        gap: 5px;
        padding-inline: 10px;
        justify-content: center;
      }

      .card {
        padding: 14px 8px;
        background: #5354;
        width: 280px;
        color: #fff;
        border-radius: 7px;
        text-align: center;
      }
    `;
  }
}

window.customElements.define("my-product", MyProduct);
