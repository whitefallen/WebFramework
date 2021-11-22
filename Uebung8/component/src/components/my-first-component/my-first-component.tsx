import {Component, Host, h, Prop} from '@stencil/core';

@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.css',
  shadow: true,
})
export class MyFirstComponent {
    @Prop() data: [];
    @Prop() color: string;
    @Prop() number: string;

    render() {
        return (
        <Host>
            <ul style={{color: this.color}}>
            {this.data.map((element, index) =>
            {
                if(index.toString() === this.number) {
                    return <li style={{fontStyle: "italic"}}>{element} - {index}</li>
                }
                return <li>{element} - {index}</li>
            }
            )}
            </ul>
        </Host>
        );
    }
}
