import {
    Component, OnInit, AfterViewInit, Input,
    ViewChild, ViewContainerRef, ComponentFactoryResolver, Type,
    OnChanges, ChangeDetectorRef
} from '@angular/core';
import { AbstractCmsComponent } from '../abstract-cms-component';
import { ComponentMapperService } from '../component-mapper.service';



@Component({
    selector: 'y-component-wrapper',
    templateUrl: './component-wrapper.component.html',
    styleUrls: ['./component-wrapper.component.scss']
})
export class ComponentWrapperComponent implements OnInit, AfterViewInit {

    @ViewChild('target', {read: ViewContainerRef}) target;
    @Input() componentType: string;
    @Input() componentUid: string;

    private isViewInitialized = false;
    cmpRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef,
        private componentMapper: ComponentMapperService
    ) { }

    ngOnInit() {}

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.launchComponent();
    }

    // ngOnChanges() {
    //     this.updateComponent();
    // }

    launchComponent() {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        const componentTypeClass = this.getComponentTypeByCode(this.componentType);

        if (componentTypeClass) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeClass);
            this.cmpRef = this.target.createComponent(factory);
            const instance: AbstractCmsComponent = this.cmpRef.instance;
            if (instance.setUid) {
                instance.setUid(this.componentUid);
            }
            this.cdRef.detectChanges();
        }else {
            console.warn('No component implementation found for the CMS component type', this.componentType, '(', this.componentUid, ').\n',
                'Make sure you implement a component and register it in the mapper.');
        }
    }

    private getComponentTypeByCode(typeCode: string): Type<any> {
        const alias = this.componentMapper.getType(typeCode);
        
        if (!alias) {
            return;
        }

        const factories = Array.from(this.componentFactoryResolver['_factories'].keys());
        const factoryClass = <Type<any>>factories.find((x: any) => x.name === alias);
        return factoryClass;
    }

}